import { Client, GatewayIntentBits } from 'discord.js';

import ready from './interactions/ready';
import interactionCreate from './interactions/interaction-create';

export default () => {
  console.log('Bot is starting...');

  const client = new Client({
    intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
  });

  ready(client);
  interactionCreate(client);

  client.login(process.env.DISCORD_TOKEN);
};
