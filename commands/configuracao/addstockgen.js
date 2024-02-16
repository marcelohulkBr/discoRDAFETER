const Discord = require("discord.js");
const fs = require('fs');
const os = require('os');
const config = require('../../config.json');

module.exports = {
    name: "addstockgen",
    description: "Hello", // Coloque o nome do comando do arquivo

    run: async (client, message, args, command) => {
        const type = args[0];
        const service = args[1];
        const account = args[2];

        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('❌ | Você não tem a permissão para usar isso');

        if (!type || !service || !account) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor(config.webhook)
                    .setTitle('Parâmetros ausentes!')
                    .setDescription('Você precisa especificar um serviço!')
                    .addField('Por exemplo', `${config.prefix}${command.name} **free** **rockstar** example@example.com`)
                    .setTimestamp()
            ]
        })

        const filePath = `${__dirname}/../../stock/gerador/${type}/${service}.txt`;

        fs.appendFile(filePath, os.EOL + account, function (error) {
            if (error) return console.error(error); // If an error occured or the stock not found, log to console

            const embed = new Discord.MessageEmbed()
                .setColor(config.webhook)
                .setTitle('Conta adicionada!')
                .setDescription(`Conta adicionada com successo \`${args[1]}\` no serviço \`${type}\`!`)
                .setTimestamp();

            fs.readFile(filePath, function (error, data) {
                data = data.toString();
                const position = data.split('\n').slice(0, 1).join('\n');
                if (position.length < 2) {
                    data = data.split('\n').slice(1).join('\n');
                    fs.writeFile(filePath, data, function (error) { })
                }
            });

            let channel = message.guild.channels.cache.get(config.channel_send)

            let numbers = 0;

            channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor(config.webhook)
                        .setTitle('Novos stocks foram adicionados!')
                        .setDescription(`> **📦 Produto recebido:** ${service[0].toUpperCase() + service.slice(1)}\n> **😃 Adicionado por:** ${message.author}`)
                ]
            })

            return message.channel.send({ embeds: [embed] }).then(message => {
                setTimeout(() => {
                    message.delete()
                }, 5000);
            });
        })
    }
}