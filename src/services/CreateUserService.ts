import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import Users from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);
    const checkUserExits = await usersRepository.findOne({ where: { email } });
    if (checkUserExits) throw new Error('email already used');

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
