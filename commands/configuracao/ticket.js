const Discord = require("discord.js")

module.exports = {
    name: "ticket", // Coloque o nome do comando do arquivo
    aliases: ["ticket"], // Coloque sinônimos aqui

    run: async (client, message, args) => {
        const logs = client.channels.cache.get('977970251801194536')
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui permissão para utilizar este comando.`)
        } else {
            let embed = new Discord.MessageEmbed()
                .setColor("#52608e")
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
                .setImage("https://i.imgur.com/PGjDNV8.png")
                .setFooter(`Copyright © ${client.user.username}`)
                .setDescription(`Para dúvidas, suporte, contato profissional, orçamentos e compras. \n\n **🎫 Detalhes** \n Ao criar um ticket você deve especificar o motivo do chamado, seja para dúvidas, compras ou suporte.`);

            let painel = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
                .setCustomId('menu')
                .setPlaceholder('Selecione alguma das opções de ticket!') // Mensagem estampada
                .addOptions([
                    {
                        label: 'Suporte Geral',
                        description: 'Suporte para dúvidas ou outros!',
                        emoji: '🙋‍♂️',
                        value: 'general',
                    },
                    {
                        label: 'Suporte Produto',
                        description: 'Suporte em algum produto de nossa loja',
                        emoji: '🛒',
                        value: 'product',
                    },
                    {
                        label: 'Denúncias',
                        description: 'Fazer denúncia de um usuário!',
                        emoji: '⛔',
                        value: 'denunciations',
                    },
                    {
                        label: 'Compra',
                        description: 'Realizar orçamento de um produto!',
                        emoji: '💰',
                        value: 'shop',
                    }
                ])
            );

            message.channel.send({ embeds: [embed], components: [painel] }).then(() => {
                logs.send(`${message.author} Utilizou o comando !ticket no canal ${message.channel}`)
                message.delete()
            });
        }
    }
}