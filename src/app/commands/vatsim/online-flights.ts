import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  APIEmbedField,
} from 'discord.js'
import type { VatsimOnlineFlightsApiResponse } from '../../types'
import { getISODate } from '../../helpers/get-formatted-date'
import { getOnlineFlights } from '../../services/vatsim/core-client'
import { Command } from '../../types'

const prepareResponse = (
  content: VatsimOnlineFlightsApiResponse[]
): APIEmbedField[] =>
  content
    .filter((flight) => flight.firs.includes('LRBB'))
    .map((flight) => ({
      name: flight.callsign,
      value: `${flight.origin}-${flight.destination}`,
      inline: true,
    }))

export const OnlineFlights: Command = {
  name: 'online-flights',
  description: 'Lists the online flight to/from any of the LRBB FIR airports',
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    const content = await getOnlineFlights()
    await interaction.followUp({
      ephemeral: true,
      embeds: [
        {
          title: 'ONLINE FLIGHTS',
          description: content ? undefined : 'No fligts online :cry:',
          fields: content ? prepareResponse(content) : undefined,
          timestamp: getISODate(),
        },
      ],
    })
  },
}
