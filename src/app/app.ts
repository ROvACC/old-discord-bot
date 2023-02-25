import { Client, GatewayIntentBits } from 'discord.js';

import ready from './interactions/ready';
import interactionCreate from './interactions/interaction-create';
import express, { Express } from 'express';
import { getMetar } from './services/met/metar';

export default () => {
  console.log('Bot is starting...');

  const client = new Client({
    intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds],
  });

  getMetar('LROP').then((res) => console.log(res)).catch((err) => console.log(err));
  ready(client);
  interactionCreate(client);

  client.login(process.env.DISCORD_TOKEN);
  const app: Express = express();
  app.listen(process.env.PORT, () => {
    console.log('Server is running...');
  });
};
