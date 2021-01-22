import { Router } from 'express';
import appointmentRoutes from './appointments.routes';

const routes = Router();

routes.use('/appoitments', appointmentRoutes);

export default routes;
