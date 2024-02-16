const Discord = require("discord.js");
const config = require('../../config.json');
const fs = require('fs');

module.exports = {
    name: "gen",
    description: "Hello", // Coloque o nome do comando do arquivo

    run: async (client, message, args, command) => {
        const service = args[0];

        if (!service) {
            return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor(config.webhook)
                        .setTitle('Serviço não selecionado')
                        .setDescription('É necessario que você selecione no minimo um produto do estoque.')
                ]
            })
        }

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
                        .setTitle('Canal sem permissão')
                        .setDescription('Esse canal não tem acesso ao gerador, se redirecione para o canal de gerador!')
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
                const filePath = `${__dirname}/../../stock/gerador/${type.name}/${service}.txt`;

                fs.readFile(filePath, function (error, data) {
                    if (error) return message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor(config.webhook)
                                .setTitle('Serviço não encontrado')
                                .setDescription(`Não existe nenhum serviço chamado \`${service}\` no meu estoque.`)
                        ]
                    })

                    data = data.toString();
                    const position = data;
                    const firstLine = data.split('\n')[0];

                    if (!position) {
                        return message.reply({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor(config.webhook)
                                    .setTitle('Sem estoque')
                                    .setDescription(`O Serviço selecionado está atualmente sem estoque, tente novamente mais tarde.`)
                            ]
                        });
                    } else {
                        message.author.send({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor(config.webhook)
                                    .setTitle('Conta gerada com êxito')
                                    .setDescription(`\`\`\`Conta gerada: ${firstLine}\`\`\` \n**💼 | Serviço selecionado:** ${service[0].toUpperCase() + service.slice(1)} \n**🎄 | Expirou:** Não definido\n**🛒 | Autor:** ${message.author}`)
                                    .setFooter({ text: 'Caso você seja mobile, basta pressionar em cima do login' })
                            ]
                        });

                        data = data.split('\n').slice(1).join('\n');
                        fs.writeFile(filePath, data, function (error) {
                            message.reply({
                                embeds: [
                                    new Discord.MessageEmbed()
                                        .setColor(config.webhook)
                                        .setTitle('Conta gerada com êxito')
                                        .setDescription(`Pronto, o serviço \`${service}\` que você selecionou, já foi gerado e já está em seu privado, caso a conta não funcione não reclame, algumas delas são uncheckeds ou antigas.`)
                                        .setImage('https://media.discordapp.net/attachments/1037732718290665573/1037765131066687488/standard.gif')
                                ]
                            })
                        });
                    }
                });
            }
        }
    }
}