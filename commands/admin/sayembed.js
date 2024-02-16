const Discord = require("discord.js")
const config = require('../../config.json')

module.exports = {
    name: "sayembed", // Coloque o nome do comando do arquivo

    run: async (client, message, args) => {
        let msg = args.join(" ");
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui permissão para utilizar este comando.`);
        } else {
            if (!msg) return message.channel.send(`❌ | ${message.author} Você precisa escrever algo para eu falar!`);

            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor('#016BDB')
                        .setDescription(msg)
                ]
            }).then(() => {
                message.delete();
            })
        }
    }
}