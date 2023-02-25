import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  APIEmbedField,
} from 'discord.js'
import { VatsimOnlineAtcApiResponse } from '../../types'
import { getISODate } from '../../helpers/get-formatted-date'
import { getOnlineAtc } from '../../services/vatsim/core-client'
import { Command } from '../../types'

const prepareResponse = (
  content: Array<VatsimOnlineAtcApiResponse>
): APIEmbedField[] =>
  content.map((crt) => ({
    name: `${crt.callsign} (${crt.frequency})`,
    value: crt.name,
  }))

export const OnlineAtc: Command = {
  name: 'online-atc',
  description: 'Lists online controllers',
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    const content = await getOnlineAtc()
    await interaction.followUp({
      ephemeral: true,
      embeds: [
        {
          title: 'ONLINE ATC',
          description: content ? undefined : 'No ATC online :cry:',
          fields: content ? prepareResponse(content) : undefined,
          timestamp: getISODate(),
        },
      ],
    })
  },
}
