import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { Command } from "../interfaces/Command";
import { Users } from "../types/users";
import memory from "../utils/memory";

export const fetchUser: Command = {
  data: new SlashCommandBuilder()
    .setName("fetch")
    .setDescription("Fetch data from Google form")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  run: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply({
      ephemeral: true,
    });

    await interaction.editReply({
      content: "Fetching...",
    });

    const url = `${process.env.GOOGLESHEET_API}?action=getEmails`;
    const data = await fetch(url);
    const json = await data.json();

    const parsed = Users.safeParse(json);
    if (parsed.success) {
      memory.set("users", parsed.data);
      await interaction.editReply({
        content: "Success",
      });
    } else {
      await interaction.editReply({
        content: "Failed to fetch data",
      });
    }
  },
};
