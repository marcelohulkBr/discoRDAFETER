const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "addproduct",

    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('❌ | Você não tem a permissão para usar isso');

        return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(config.webhook)
                    .setTitle('Adicionar produto')
                    .setDescription('Clique no botão para adicionar')

            ], components: [
                new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('new_product')
                            .setEmoji('➕')
                            .setLabel('Adicionar produto')
                            .setStyle('SUCCESS')
                    )
            ]
        });
    }
}