const Discord = require("discord.js")

module.exports = {
    name: "say", // Coloque o nome do comando do arquivo

    run: async(client, message, args) => {

    const logs = client.channels.cache.get('988466982229790821')
        
    let msg = args.join(" "); //Mensagem
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.reply(`Você não possui permissão para utilizar este comando.`);
    }else{
    if (!msg) return message.channel.send(`:x: | ${message.author} Você precisa escrever algo para eu falar!`); //verificando se há alguma mensagem
    message.channel.send(`${msg}`) //comando para o bot falar sua mensagem
    logs.send(`${message.author} Utilizou o comando !sayembed no canal ${message.channel}!`)
    message.delete();
  }
}
}