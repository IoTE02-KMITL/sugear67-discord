import { z } from "zod";

export const getUser = async (email: string) => {
  const User = z.object({
    email: z.string(),
    tcas: z.number(),
    name: z.string(),
    firstname: z.string(),
    lastname: z.string(),
  });

  const url = `${process.env.GOOGLESHEET_API}?action=getEmails&email=${email}`;

  const data = await fetch(url);
  const json = await data.json();

  const parsed = User.safeParse(json);
  if (parsed.success) {
    return parsed.data;
  }

  return null;
};
