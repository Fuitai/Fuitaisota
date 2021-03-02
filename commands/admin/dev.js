const { MessageEmbed } = require('helperis');

const usersDB = require("../../database/schematics/User.js");

module.exports = {
    name: 'dev',
    category: "admin",
    description: "Give dev admin to a user",
    usage: "`&dev <add | remove> <User ID>`",
    run: async (bot, msg, args) => {

        if (msg.author.id !== '610887342009483277') return msg.addReaction("fdenied:809930225273929748");

        if (!args[0]) return msg.addReaction("fnope:809930139957460993");

        if (args[0] === "add") {

            if (!args[1]) return msg.addReaction("fnope:809930139957460993");

            if (isNaN(args[1])) return msg.addReaction("fnope:809930139957460993");

            let user = msg.channel.guild.members.get(args[1]);

            if (!user) return msg.addReaction("fnope:809930139957460993");

            let userDB = await usersDB.findOne({ id: user.id });

            if (!userDB) return msg.channel.createMessage("<:fnope:809930139957460993> That user is not registered on the DB!");

            if (userDB.dev !== false) {
                msg.channel.createMessage("<:fnope:809930139957460993> ```ERR: USER_ALREADY_IN_DB```");
                return msg.addReaction("fnope:809930139957460993");
            }

            userDB.dev = true
            await userDB.save().catch(err => console.log(err));
            return msg.addReaction("fyep:809930171569930270");
        } else
            if (args[0] === "remove") {

                if (!args[1]) return msg.addReaction("fnope:809930139957460993");

                if (isNaN(args[1])) return msg.addReaction("fnope:809930139957460993");

                let user = msg.channel.guild.members.get(args[1]);

                if (!user) return msg.addReaction("fnope:809930139957460993");

                let userDB = await usersDB.findOne({ id: user.id });

                if (!userDB) return msg.channel.createMessage("<:fnope:809930139957460993> That user is not registered on the DB!");

                if (userDB.dev === false) {
                    msg.channel.createMessage("<:fnope:809930139957460993>```ERR: USER_NOT_IN_DB```");
                    return msg.addReaction("fnope:809930139957460993");
                }

                userDB.dev = false
                await userDB.save().catch(err => console.log(err));
                return msg.addReaction("fyep:809930171569930270");
            } else {
                return msg.addReaction("fnope:809930139957460993");
            }
    }
}