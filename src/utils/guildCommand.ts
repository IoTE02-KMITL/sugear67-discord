import { Client, REST, Routes } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const guildCommand = async (client: Client, guildId: string) => {
  const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(client.user?.id || "missing id", guildId),
    { body: commandData }
  );

  console.log(`Successfully registered application commands for ${guildId}`);
};
