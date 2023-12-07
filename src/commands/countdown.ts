import { SlashCommandBuilder, PermissionFlagsBits, Client } from "discord.js";
import { Command } from "../interfaces/Command";
import { sentCountdown } from "../utils/sentCountdown";
import memory from "../utils/memory";
import { CronJob } from "cron";

export const countdown: Command = {
  data: new SlashCommandBuilder()
    .setName("countdown")
    .setDescription("countdown")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  run: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply({
      ephemeral: true,
    });

    const guildId = interaction.guildId;
    const channelId = interaction.channelId;
    const dueDate = "December 21, 2023 00:00:00";

    memory.set("countdown:guildId", guildId);
    memory.set("countdown:channelId", channelId);
    memory.set("countdown:dueDate", dueDate);

    const message = "ต้องลงภาย{{countdown}} นะครับน้องๆ";

    memory.set("countdown:message", message);

    const client = memory.get("client") as Client;
    const channel = client.channels.cache.get(channelId);
    if (!channel?.isTextBased()) {
      await interaction.editReply({
        content: "Channel is not text based",
      });
      return;
    }

    await interaction.editReply({
      content: "Success",
    });

    const messageInfo = await channel.send(message);
    memory.set("countdown:messageId", messageInfo.id);

    const job = new CronJob(
      "10 * * * *",
      async function () {
        await sentCountdown();
      },
      null,
      true,
      "Asia/Bangkok"
    );

    await sentCountdown();
  },
};
