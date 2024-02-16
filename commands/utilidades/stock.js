const Discord = require("discord.js");
const config = require('../../config.json');
const fs = require('fs');

module.exports = {
    name: "stock",
    description: "Hello", // Coloque o nome do comando do arquivo

    run: async (client, message, args) => {
        const channel = message.channel;

        let type = {}

        config.gerador.forEach(gerador => {
            if (channel.id == gerador.channel) {
                type = gerador
                return;
            }
        });

        if (!type.name) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor(config.webhook)
                        .setTitle('Canal inválido')
                        .setDescription('Você precisa estar em um canal correto para ver o stock!')
                ]
            })
        } else {
            if (!message.member.roles.cache.has(type.cargo)) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor(config.webhook)
                            .setTitle('Sem permissão')
                            .setDescription('Você não tem permissão para utilizar esse gerador!')
                    ]
                })
            } else {

                const stock = [];

                fs.readdir(`${__dirname}/../../stock/gerador/${type.name}/`, function (err, files) {
                    files.forEach(function (file) {
                        if (!file.endsWith('.txt')) return
                        stock.push(file)
                    });

                    const embed = new Discord.MessageEmbed()
                        .setColor(config.webhook)
                        .setTitle(`Estoque - ${type.name[0].toUpperCase() + type.name.slice(1)}`)
                        .setDescription('')

                    stock.forEach(async function (data) {
                        const acc = fs.readFileSync(`${__dirname}/../../stock/gerador/${type.name}/${data}`, 'utf-8')
                        const lines = [];
                        acc.split(/\r?\n/).forEach(function (line) {
                            lines.push(line);
                        });
                        embed.addField(`**📦 | ${data.replace('.txt', '')}:**`, `\`\`\`${lines.length} Produto(s)\`\`\``, true)
                    });

                    message.channel.send({ embeds: [embed] })
                })
            }
        }
    }
}