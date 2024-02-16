const Discord = require("discord.js");

module.exports = {
	name: "clear",

	run: async (client, message, args) => {
		if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`❌ | ${message.author} Você não tem permissão para utilizar este comando.`);
		if (!args[0] || args[0] < 1 || args[0] > 99) return message.reply(`❌ | Insira um valor entre 1-99`);

		const quantity = parseInt(args[0], 10);

		const delete_messages = await message.channel.messages.fetch({
			limit: quantity + 1
		});

		message.channel.bulkDelete(delete_messages).then(() => {
			message.channel.send(`🎉 | O chat teve ${quantity} mensagens deletadas por ${message.author}`).then(msg => { setTimeout(() => { msg.delete() }, 10000) })
		})
	}
};