import { Client, Events } from "discord.js";
import { IntentsOptions } from "./config/IntentOptions";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { validateEnv } from "./utils/validateEnv";
import memory from "./utils/memory";

validateEnv();

(async () => {
  const client = new Client({ intents: IntentsOptions });

  memory.set("client", client);

  client.on(Events.ClientReady, () => onReady(client));

  client.on(
    Events.InteractionCreate,
    async (interaction) => await onInteraction(interaction)
  );

  await client.login(process.env.DISCORD_TOKEN);
})();
