import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  _id: z.string().optional(),
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type ICar = z.infer<typeof carZodSchema>;

export { ICar, carZodSchema };