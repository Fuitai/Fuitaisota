const beautify = require("beautify");
const { MessageEmbed } = require('helperis');

const usersDB = require("../../database/schematics/User.js");

module.exports = {
    name: 'eval',
    aliases: ["ev", "e"],
    category: "admin",
    description: "Command locked to Admin Devs of the bot.",
    run: async (bot, msg, args) => {

        let userDB = await usersDB.findOne({ id: msg.author.id });

        if (userDB.dev === false) return msg.addReaction("fdenied:809930225273929748");

       // if (msg.author.id !== '610887342009483277')  return msg.addReaction("fdenied:809930225273929748");

        if (!args[0]) return msg.addReaction("fnope:809930139957460993");

        try {

            if (args.join(" ").toLowerCase().includes("token")) {
                return msg.addReaction("fdenied:809930225273929748");
            }

            const toEval = args.join(" ");
            const evaluated = eval(toEval);

            msg.channel.sendTyping()
            let embed = new MessageEmbed()
                .setColor("#00FF00")
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.avatarURL)
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``)
                .addField("Evaluated:", `${evaluated}`)
                .addField("Type of:", `${typeof (evaluated)}`);

            await msg.addReaction("fyep:809930171569930270");
            return msg.channel.createMessage({ embed: embed.code });
        } catch (e) {

            msg.channel.sendTyping()
            let embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("\<:fnope:809930139957460993> Error!")
                .setDescription("<:fnope:809930139957460993> Oh no! Something went wrong...\n" + "```" + e + "```")
                .setFooter(bot.user.username, bot.user.avatarURL)
                .setTimestamp();

                await msg.addReaction("fnope:809930139957460993");
            return msg.channel.createMessage({ embed: embed.code });
        }
    }
}