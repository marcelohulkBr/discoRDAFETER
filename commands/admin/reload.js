const Discord = require("discord.js")

module.exports = {
    name: "reload", // Coloque o nome do comando do arquivo

    run: async (client, message, args) => {
    const dono = "784932247002152970"
    
        let reason = args.slice(0).join(' ');
    
        if (message.author.id === "784932247002152970" || message.author.id === '784932247002152970' || message.author.id === '286144811680137218'){
        if (reason.length < 1) return message.reply('**Diga o comando que devo reiniciar!**');
    
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    
        message.channel.send("**:gear: " + message.author + " Comando " + args[0] + ".js reiniciado!**");
    
    } else {
        message.reply("**Sem permissão. :confused:**");
    }
    }
}