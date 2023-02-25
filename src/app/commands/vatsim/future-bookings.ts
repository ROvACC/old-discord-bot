import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  APIEmbedField,
} from 'discord.js';
import type { FutureBookingApiResponse } from '../../types';
import { getISODate } from '../../helpers/get-formatted-date';
import { getFutureBookings } from '../../services/vatsim/core-client';
import { Command } from '../../types';

const prepareResponse = (
  content: FutureBookingApiResponse[]
): APIEmbedField[] =>
  content.map(booking => ({
    name: `${booking.callsign} (${booking.name})`,
    value: `${booking.date} / ${booking.timeStart}-${booking.timeStop}`,
    inline: true,
  }));

export const FutureBookings: Command = {
  name: 'booking-list',
  description: 'Lists the online flight to/from any of the LRBB FIR airports',
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    const content = await getFutureBookings();
    await interaction.followUp({
      ephemeral: true,
      embeds: [
        {
          title: 'BOOKINGS IN THE NEXT 48 HOURS',
          description: content ? undefined : 'No bookings registered :cry:',
          fields: content ? prepareResponse(content) : undefined,
          timestamp: getISODate(),
        },
      ],
    });
  },
};
