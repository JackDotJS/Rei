export default {
    name: 'messageDelete',
    async execute(message) {
        if (message.author?.bot || !message.guild) return;

        const logChannel = message.guild.channels.cache.find(
            channel => channel.name === 'deletions'
        );

        if (!logChannel) return;

        const timestamp = new Date();
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 72
        });
        const deletionLog = fetchedLogs.entries.first();
        const executor = deletionLog?.executor;
        const deletedBy = executor ? `\n\n**Deleted By**\n<@${executor.id}> | ${executor.tag}\n\`${executor.id}\`` : '';

        await logChannel.send({
            embeds: [{
                title: '🗑️ Message Deleted',
                description: `**Original message posted on**\n${message.createdAt.toUTCString()}\n` +
                    `(<t:${Math.floor(message.createdTimestamp / 1000)}:R>)\n\n` +
                    `**Author**\n<@${message.author.id}> | ${message.author.tag}\n\`${message.author.id}\`` +
                    deletedBy + `\n\n` +
                    `**Message Location**\n${message.channel}${message.reference ? ` | [In reply to](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.reference.messageId})` : ''}\n\n` +
                    `**Deleted Message**\n${message.content || 'No text content'}`,
                color: 0xFF0000,
                footer: {
                    text: `Event logged on ${timestamp.toUTCString()} • ${timestamp.toLocaleString()}`
                }
            }]
        });
    }
};
