import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class AuthenticationService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect combination of email/password');

    const checkPassword = await compare(password, user.password);

    if (!checkPassword)
      throw new Error('Incorrect combination of email/password');

    const { expiresIn, secrete } = authConfig.jwt;
    const token = sign({}, secrete, {
      expiresIn,
      subject: user.id,
    });

    return { user, token };
  }
}

export default AuthenticationService;
