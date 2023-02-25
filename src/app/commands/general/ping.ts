import { CommandInteraction, Client, ApplicationCommandType } from 'discord.js'
import { Command } from '../../types'

export const Ping: Command = {
  name: 'ping',
  description: 'Replies with Pong!',
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    await interaction.followUp({
      ephemeral: true,
      content: 'Pong!',
    })
  },
}
