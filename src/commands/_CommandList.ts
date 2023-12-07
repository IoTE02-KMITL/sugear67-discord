import { Command } from "../interfaces/Command";
import { countdown } from "./countdown";
import { fetchUser } from "./fetch";
// import { ping } from "./ping";
import { regis } from "./regis";

export const CommandList: Command[] = [
  countdown,
  fetchUser,
  // ping,
  regis,
];
