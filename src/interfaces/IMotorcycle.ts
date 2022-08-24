import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const motoZodSchema = vehicleZodSchema.extend({
  _id: z.string().optional(),
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().min(1).lte(2500),
});

type IMotorcycle = z.infer<typeof motoZodSchema>;

export { IMotorcycle, motoZodSchema };