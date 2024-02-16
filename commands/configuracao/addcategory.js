const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "addcategory",

    run: async (client, message, args, command) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('❌ | Você não tem a permissão para usar isso');

        let category_name = args[0];
        let category_channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);

        if (!category_name || !category_channel) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(config.webhook)
                    .setTitle('Parâmetros ausentes!')
                    .setDescription('Você precisa especificar o nome e o canal!')
                    .addField('Por exemplo', `${config.prefix}${command.name} **exemplo** #canal`)
            ]
        })

        conn.query(`INSERT INTO categories (server_id, name, channel_id) VALUES ('${message.guildId}','${category_name}','${category_channel.id}')`, function (err) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor(config.webhook)
                        .setTitle('Categoria')
                        .setDescription(`A categoria ${category_name} foi criada com successo!`)
                ]
            })
        })
    }
}