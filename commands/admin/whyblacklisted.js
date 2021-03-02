const { MessageEmbed } = require('helperis');

const usersDB = require("../../database/schematics/User.js");

module.exports = {
    name: "whyblacklisted",
    category: "admin",
    description: "See why someone is blacklisted!",
    usage: "`&whyblacklisted <user ID>`",
    run: async (bot, msg, args) => {

        if (!args[0]) return msg.addReaction("fnope:809930139957460993");

        if (isNaN(args[0])) return msg.addReaction("fnope:809930139957460993");

        let user = msg.channel.guild.members.get(args[0]);

        if (!user) return msg.addReaction("fnope:809930139957460993");

        let userDB = await usersDB.findOne({ id: user.id });

        if (!userDB) return msg.channel.createMessage("<:fnope:809930139957460993> That user is not registered on the DB!");

        if (userDB.blacklisted === false) {

            await msg.addReaction("fyep:809930171569930270");
            msg.channel.sendTyping()

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Why Blacklisted ${user.username}#${user.discriminator}`)
                .setDescription(`<:fnope:809930139957460993> That user isn't blacklisted...`)
                .setFooter(`Requested by: ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                .setTimestamp();
            return msg.channel.createMessage({ embed: embed.code });

        } else  if (userDB.blacklisted !== false) {

            await msg.addReaction("fyep:809930171569930270");
            msg.channel.sendTyping()

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Why Blacklisted ${user.username}#${user.discriminator}`)
                .setDescription(`That user has been blacklisted due to this reason: **${userDB.blacklistReason}**`)
                .setFooter(`Requested by: ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                .setTimestamp();
                return msg.channel.createMessage({ embed: embed.code });

        }
    }
}