import memory from "./memory";
import { Users } from "../types/users";

export const getUser = async (email: string) => {
  const users = memory.get("users");

  const parsedUsers = Users.safeParse(users);
  if (parsedUsers.success) {
    const user = parsedUsers.data.find((u) => u.email === email);
    if (user) return user;
  }

  const url = `${process.env.GOOGLESHEET_API}?action=getEmails`;
  const data = await fetch(url);
  const json = await data.json();

  const parsed = Users.safeParse(json);
  if (parsed.success) {
    memory.set("users", parsed.data);
    const user = parsed.data.find((u) => u.email === email);
    if (user) return user;
  }

  return null;
};
