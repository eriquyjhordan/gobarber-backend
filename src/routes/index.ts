import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import usersRouter from './users.routes';
import authenticationRoutes from './sessions.routes';

const routes = Router();

routes.use('/appoitments', appointmentRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', authenticationRoutes);

export default routes;
