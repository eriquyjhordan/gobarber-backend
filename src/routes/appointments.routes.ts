import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const paserDate = parseISO(date);
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      date: paserDate,
      provider_id,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.mensage });
  }
});

export default appointmentRouter;
