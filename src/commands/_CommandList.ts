import { Command } from "../interfaces/Command";
import { ping } from "./ping";
import { regis } from "./regis";

export const CommandList: Command[] = [ping, regis];
