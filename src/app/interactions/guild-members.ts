import { Client, Events, GuildMember } from 'discord.js'

export default (client: Client): void => {
  client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    member.client
  })
}
