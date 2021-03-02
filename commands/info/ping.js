const { MessageEmbed } = require('helperis');
const fetch = require("node-fetch");
const images = require('../../assets/gifs/ping.json');

module.exports = {
    name: "ping",
    category: "Info",
    description: "Returns Latency, Uptime and Image Transport",
    run: async (bot, msg, args) => {

        msg.channel.sendTyping()

        let time = await Date.now();

        const embed2 = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription("🏓")
            .addField('Ping', `---\n` + "*`Response Time`*", true)
            .addField('Pong', `---\n` + "*`Image Transport`*", true)
            .addField('Plenk', `---\n` + "*`Time Active`*", true)

        const moment = require("moment");
        require('moment-duration-format');

        const actividad = moment.duration(bot.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");

        const message = await msg.channel.createMessage({ embed: embed2.code })

        let result = Math.floor((Math.random() * images.length));

        fetch("https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=maid&pid=7234").then(res => res.json()).then(async body => {
            let newTime = await Date.now();

            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setDescription("🏓")
                .addField('Ping', `${Math.floor(message.createdAt - msg.createdAt)}ms\n` + "*`Response Time`*", true)
                .addField('Pong', `${Math.floor(newTime - time)}ms\n` + "*`Image Transport`*", true)
                .addField('Plenk', `${actividad}\n` + "*`Time Active`*", true)
                .setImage(images[result])

            message.edit({ embed: embed.code });
        })
    }
}
