const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "saveproduct",

    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('❌ | Você não tem a permissão para usar isso');
        conn.query('SELECT * FROM products ORDER BY id DESC', function (err, row) {
            const products = row;

            const menuRow = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('products_menu')
                        .setPlaceholder('Selecione um produto para salvar!')
                        .addOptions(products.map(product => ({
                            label: product.name,
                            value: `${product.id}`,
                            description: `Valor R$ ${product.value}`,
                        })
                        )
                        )
                )

            message.reply({ components: [menuRow] })
        });

    }
}