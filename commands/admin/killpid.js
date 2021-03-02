const usersDB = require("../../database/schematics/User.js");

module.exports = {
    name: "killpid",
    category: "admin",
    description: "kill a process pid",
    usage: "`&Killpid <pid>`",
    run: async (bot, msg, args) => {

        let userDB = await usersDB.findOne({ id: msg.author.id });

        if (userDB.dev === false) return msg.addReaction("fdenied:809930225273929748");

        if (!args[0]) return msg.addReaction("fnope:809930139957460993");

        try {

            await msg.addReaction(`fyep:809930171569930270`);

            await process.kill(args[0]);

        } catch (e) {

            msg.channel.sendTyping()
            return msg.channel.createMessage(`<:fnope:809930139957460993> Oh no! Something went wrong...\n` + "```" + e + "```");
        }
    }
}