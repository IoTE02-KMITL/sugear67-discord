import { Command } from "../interfaces/Command";
import { fetchUser } from "./fetch";
// import { ping } from "./ping";
import { regis } from "./regis";

export const CommandList: Command[] = [
  fetchUser,
  // ping,
  regis,
];
