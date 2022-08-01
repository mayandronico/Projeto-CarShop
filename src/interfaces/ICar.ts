import { z } from 'zod';

const carZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type ICar = z.infer<typeof carZodSchema>;

export default ICar;
export { ICar, carZodSchema };