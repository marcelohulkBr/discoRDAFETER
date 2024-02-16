const Discord = require("discord.js")
const hastebin = require('hastebin');

module.exports = {
    name: "transcript", // Coloque o nome do comando do arquivo

    run: async(client, message, args) => {

    const logs = client.channels.cache.get('988466982229790821')

    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.reply(`Você não possui permissão para utilizar este comando.`);
    }else{
    const guild = client.guilds.cache.get(message.guildId);
    const chan = guild.channels.cache.get(message.channelId);

    const msg = await message.reply({content: 'Salvando mensagens...'})

    chan.messages.fetch().then(async (messages) => {
        let a = messages.filter(m => m.author.bot !== true).map(m =>
        `${new Date(m.createdTimestamp).toLocaleString('pt-BR')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        ).reverse().join('\n');
        if (a.length < 1) a = "Nenhuma conversa aqui :)"
        hastebin.createPaste(a, {
            contentType: 'text/plain',
            server: 'https://hastebin.com/'
        }, {})
        .then(function (urlToPaste) {
            const embed = new Discord.MessageEmbed()
            .setAuthor('Logs discord')
            .setDescription(`📰 Registros do canal <#${chan.id}> [**Clique aqui para ver as logs**](${urlToPaste})`)
            .setColor('#57ff00')
            .setFooter(`Copyright © ${client.user.username}`)
            .setTimestamp();
            
            message.author.send({embeds: [embed], content: 'Salvo com sucesso ✅!'});
            msg.edit(`${message.author} Todas as logs do canal <#${chan.id}> foi enviadas no seu privado!`).then(msg => {
                setTimeout( () => {
                    msg.delete();
                }, 10000)
            })
        });
        });
    logs.send(`${message.author} fez backup de todas as mensagens do canal ${message.channel}`)
  }
}
}