import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from 'discord.js';

import { getMetar } from '../../services/met/metar';
import { Command } from '../../types';

export const Metar: Command = {
  name: 'metar',
  description: 'Provides the metar to the specified airport',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'icao',
      description: 'ICAO code of the airport',
      type: ApplicationCommandOptionType.String,
      required: true,
      minLength: 4,
      maxLength: 4,
    },
  ],
  run: async (_: Client, interaction: CommandInteraction) => {
    const icaoParam = interaction.options.data.find(
      option => option.name === 'icao'
    );
    const icao = (icaoParam?.value as string).toLocaleUpperCase();
    const content = await getMetar(icao);
    await interaction.followUp({
      ephemeral: true,
      embeds: [
        {
          title: `METAR FOR ${icao}`,
          description: content,
        },
      ],
    });
  },
};
