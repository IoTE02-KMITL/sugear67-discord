import { z } from "zod";

export const User = z.object({
  email: z.string(),
  tcas: z.union([z.string(), z.number()]),
  name: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export const Users = z.array(User);
