const serverPrefix = require("../../database/schematics/prefix.js");
const { MessageEmbed } = require('helperis');

module.exports = {
    name: "whatprefix",
    aliases: ["prefix"],
    category: "util",
    description: "Tells you the current prefix on your server",
    usage: "`<whatprefix",
    run: async (bot, msg, args) => {

        let data = await serverPrefix.findOne({ GuildID: msg.channel.guild.id });

        let prefix = data.Prefix || "<";

        const embed = new MessageEmbed()
            .setColor("#ff0080")
            .setTitle("Current server prefix :sparkles:")
            .setThumbnail(bot.user.dynamicAvatarURL("png", 1048))
            .setDescription(`My prefix on this server is: **${prefix}**\n\nTry it out by doing **${prefix}help commands** :purple_heart: `)
            .setTimestamp()
            msg.channel.createMessage({ embed: embed.code });

    }

}