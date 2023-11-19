import { SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/Command";
import { config } from "../config/config";

export const regis: Command = {
  data: new SlashCommandBuilder()
    .setName("regis")
    .setDescription("ลงทะเบียน")
    .addNumberOption((option) =>
      option
        .setName("TCAS")
        .setDescription("TCAS 67 -> 68 -> 69")
        .setMinValue(67)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("Name")
        .setDescription("น้องอยากให้พี่เรียกว่าอะไรดี")
        .setRequired(true)
    ),
  run: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();
    const tcas = interaction.options.getNumber("TCAS");
    const name = interaction.options.getString("Name");

    let errors: string[] = [];

    if (typeof tcas !== "number") {
      errors.push("TCAS must be a number");
    } else {
      if (tcas < 67) {
        errors.push("TCAS must be greater than or equal to 67");
      }
    }

    if (typeof name !== "string") {
      errors.push("Name must be a string");
    }

    if (errors.length > 0) {
      await interaction.editReply(errors.join("\n"));
      return;
    }

    const user = interaction.guild?.members.cache.get(interaction.user.id);
    if (!user) {
      await interaction.editReply({
        content: "You are not in the server",
      });
      return;
    }

    user.setNickname(`N'${name}`);
    user.roles.add(config.role.nong);

    const color = parseInt(
      Math.floor(Math.random() * 16777215).toString(16),
      16
    );

    await interaction.reply({
      embeds: [
        {
          title: `ยินดีต้อนรับน้อง ${name}`,
          color: color,
          timestamp: new Date().toString(),
        },
      ],
    });
  },
};
