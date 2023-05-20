import { z } from "zod";

const movie = z.object({
  id: z.string().uuid(),
  name: z.string().max(50),
  description: z.string().optional(),
  duration: z.number().int(),
  price: z.number().int(),
});

const movieCreated = movie.omit({ id: true });
const movieUpdate = movieCreated.partial()

export { movieCreated, movieUpdate };
