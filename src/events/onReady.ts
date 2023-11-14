import { Client } from "discord.js";
import { guildCommand } from "../utils/guildCommand";

export const onReady = async (client: Client) => {
  await guildCommand(client, process.env.DISCORD_GUILD_ID);
};
