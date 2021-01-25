import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appoitments', appointmentRoutes);
routes.use('/users', usersRouter);

export default routes;
