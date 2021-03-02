const { MessageEmbed } = require('helperis');

const usersDB = require("../../database/schematics/User.js");

module.exports = {
    name: "admincmds",
    category: "admin",
    description: "Special commands only available for Admins of the bot.",
    run: async (bot, msg, args) => {

        let userDB = await usersDB.findOne({ id: msg.author.id });

        if (userDB.dev === false) return msg.addReaction("fdenied:809930225273929748");

        msg.channel.sendTyping()
        let embed = new MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Admin Commands")
        .setDescription("Total Commands: **7**\n\n`admincmds`, `blacklist`, `dev`, `eval`, `killpid`, `pid`, `whyblacklisted`")
        .setFooter(`Requested by: ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
        .setTimestamp()
  
        const dmChannel = await bot.getDMChannel(msg.author.id);
        await msg.addReaction("fyep:809930171569930270");
        return dmChannel.createMessage({ embed: embed.code });

    }
}