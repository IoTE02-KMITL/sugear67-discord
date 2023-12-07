import { Client } from "discord.js";
import TimeAgo from "javascript-time-ago";
import th from "javascript-time-ago/locale/th";
import memory from "./memory";
import { type } from "os";

TimeAgo.addDefaultLocale(th);
const timeAgo = new TimeAgo("th-TH");

export const sentCountdown = async () => {
  const channelId = memory.get("countdown:channelId");
  const dueDate = memory.get("countdown:dueDate");
  const message = memory.get("countdown:message");
  const messageId = memory.get("countdown:messageId");
  const client = memory.get("client") as Client;

  if (typeof channelId !== "string") return;
  if (typeof dueDate !== "string") return;
  if (typeof message !== "string") return;
  if (typeof messageId !== "string") return;

  const timeago = timeAgo.format(new Date(dueDate), { future: true });

  const messageToSend = message.replace("{{countdown}}", timeago);
  const channel = client.channels.cache.get(channelId);
  if (!channel?.isTextBased()) return;
  const messageObject = await channel.messages.fetch(messageId);
  if (!messageObject) return;
  messageObject.edit(messageToSend);

  return null;
};
