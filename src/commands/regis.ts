import { SlashCommandBuilder } from "discord.js";
import validator from "validator";
import { Command } from "../interfaces/Command";
import { config } from "../config/config";
import { getUser } from "../utils/getUser";

export const regis: Command = {
  data: new SlashCommandBuilder()
    .setName("regis")
    .setDescription("ลงทะเบียน")
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription("Email ที่น้องใช้ลงทะเบียนใน Form")
        .setRequired(true)
    ),
  run: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply({
      ephemeral: true,
    });
    const email = interaction.options.getString("email");

    if (typeof email !== "string") {
      await interaction.editReply({
        content: "พี่ว่าเมลมันไม่ใช่ตัวหนังสือนะ",
      });
      return;
    }

    if (!validator.isEmail(email)) {
      await interaction.editReply({
        content: "พี่ว่าเมลมันแปลกๆ นะ",
      });
      return;
    }

    const found = await getUser(email);
    if (found === null) {
      await interaction.editReply({
        content: "พี่ไปดูใน Form แล้ว พี่ไม่เห็นเมลน้องเลยอะ",
      });
      return;
    }

    const user = interaction.guild?.members.cache.get(interaction.user.id);
    if (!user) {
      await interaction.editReply({
        content: "น้องไม่ได้อยู่ในเซิร์ฟเวอร์นะ",
      });
      return;
    }

    if (user.roles.cache.has(config.role.nong)) {
      await interaction.editReply({
        content: "พี่เห็นนะว่าน้องลงทะเบียนไปแล้วนะ",
      });
      return;
    }

    const color = parseInt(
      Math.floor(Math.random() * 16777215).toString(16),
      16
    );

    await interaction.deleteReply();

    await interaction.followUp({
      embeds: [
        {
          title: `ยินดีต้อนรับน้อง ${found.name}`,
          description: `TCAS ${found.tcas}`,
          color: color,
          timestamp: new Date().toISOString(),
        },
      ],
    });

    await interaction.guild?.members.edit(user.id, {
      nick: `N'${found.name}`,
      roles: [config.role.nong],
    });

    // user.roles.add(config.role.nong);
    // user.setNickname(`N'${found.name}`);
  },
};
