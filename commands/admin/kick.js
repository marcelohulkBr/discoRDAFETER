const Discord = require("discord.js")

module.exports = {
    name: "kick", // Coloque o nome do comando do arquivo
    aliases: ["expulsar"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        const logs = client.channels.cache.get('977970251801194536')

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.reply(`Você não possui permissão para utilizar este comando.`)
        } else {

            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let motivo = args[1];

            if (!motivo) motivo = "Não definido.";

            if (!user) {

                let embed = new Discord.MessageEmbed()
                .setColor("#52608e")
                .setDescription(`\`!kick [membro] [motivo]\``);

                message.reply({ embeds: [embed] })

            } else {

                    user.kick(motivo).then(() => message.reply(`O usuário \`${user.user.tag}\` foi expulso com sucesso.`)).catch(e => {
                        message.reply(`Não foi possível expulsar o usuário \`${user.user.tag}\`.`).cath(e => {
                            logs.send(`${message.author} deu kick no usuário <@${user.user.id}> pelo motivo: ${motivo}!`)
                        })
                    })
                    
            }
        }
        
    }
}