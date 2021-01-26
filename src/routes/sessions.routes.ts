import { Router } from 'express';
import AuthenticationService from '../services/AuthenticationService';

const authenticationRoutes = Router();

authenticationRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authetication = new AuthenticationService();

    const { user, token } = await authetication.execute({ email, password });
    const { id, name, created_at, updated_at } = user;
    return response.json({
      id,
      name,
      email,
      created_at,
      updated_at,
      token,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default authenticationRoutes;
