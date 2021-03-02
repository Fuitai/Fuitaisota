const { MessageEmbed } = require('helperis');
const fetch = require("node-fetch");

module.exports = {
    name: "whatanime",
    aliases: ["wa"],
    category: "anime",
    description: "Finds from what anime an image is.\n\n",
    usage: "`&whatanime [IMAGE URL]`\n\nUsing this command with an attachment also works.",
    run: async (bot, msg, args) => {

        if (msg.attachments[0]) {
            //console.log(msg.attachments[0].url);
            fetch(`https://trace.moe/api/search?url=${msg.attachments[0].url}`).then(async res => res.json()).then(async body => {
                if (!body) {
                    msg.channel.sendTyping()
                    return msg.channel.createMessage("<:fnope:809930139957460993> Something unexpected has ocurred. Try again... 🙁");
                }

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`**${body.docs[0].title_english}**\n\nOriginal Name: **${body.docs[0].title_chinese}**`)
                    .addField(`Episode:`, `${body.docs[0].episode}`, true)
                    .addField(`Timestamp:`, `${body.docs[0].at}`, true)
                    .addField(`Similarity:`, `${body.docs[0].similarity}`, true)
                    .addField(`Is Hentai?`, `${body.docs[0].is_adult}`)
                    .setTimestamp();
                return msg.channel.createMessage({ embed: embed.code });
            }).catch(e => {
                return msg.channel.createMessage("<:fnope:809930139957460993> Oh no! Something went wrong...\n" + "```" + e + "```");
            })
        } else 

        if (args[0]) {
            fetch(`https://trace.moe/api/search?url=${args.slice(0).join(' ')}`).then(async res => res.json()).then(async body => {
                if (!body) {
                    msg.channel.sendTyping()
                    return msg.channel.createMessage("<:fnope:809930139957460993> Something unexpected has ocurred. Try again... 🙁");
                }

                msg.channel.sendTyping()
                const embed = new MessageEmbed()
                    .setColor("#ff0080")
                    .setDescription(`**${body.docs[0].title_english}**\n\nOriginal Name: **${body.docs[0].title_chinese}**`)
                    .addField(`Episode:`, `${body.docs[0].episode}`, true)
                    .addField(`Timestamp:`, `${body.docs[0].at}`, true)
                    .addField(`Similarity:`, `${body.docs[0].similarity}`, true)
                    .addField(`Is Hentai?`, `${body.docs[0].is_adult}`)
                    .setTimestamp();
                return msg.channel.createMessage({ embed: embed.code });
            }).catch(e => {
                return msg.channel.createMessage("<:fnope:809930139957460993> Oh no! Something went wrong...\n" + "```" + e + "```");
            })
        } else {
            return msg.channel.createMessage("<:fnope:809930139957460993> You need to send an attachment with the command or an Image URL!");
        }
    }
}