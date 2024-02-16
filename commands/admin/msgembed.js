const Discord = require("discord.js")

module.exports = {
    name: "msgembed", // Coloque o nome do comando do arquivo
    aliases: ["pv"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        const logs = client.channels.cache.get('988466982229790821')

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply({ content: `Você não possui permissão para utilizar este comando.` });
        } else {
            let user = message.mentions.users.first() || client.users.cache.get(args[0]);
            let dm_msg = args.slice(1).join(" ");
            if (!user || !args[1]) {
                embed = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setDescription(`\`!msg [usuário] [mensagem]\``)
                message.reply({ embeds: [embed] })
            } else {
                embed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`Mensagem:`)
                    .setDescription(`\n${dm_msg}\n`)
                message.reply({ content: `A mensagem foi enviada com sucesso para \`${user.tag}\`.`, embeds: [embed] }).then(m => {
                    embed = new Discord.MessageEmbed()
                        .setColor('#52608e')
                        .setDescription(`${dm_msg}`)
                    user.send({ embeds: [embed] }).catch(e => { m.edit({ content: `\\❌ Ops! A dm do usuário \`${user.tag}\` está bloqueada!`, } `${dm_msg}`) })
                })
                logs.send({ content: `${message.author} Utilizou o comando !msg e enviou uma mensagem para <@${user.id}>` })
            }
        }

    }
}