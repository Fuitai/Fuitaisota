const { MessageEmbed } = require('helperis');
const serverPrefix = require("../../database/schematics/prefix.js");

module.exports = {
    name: "help",
    aliases: ["welp", "?", "<help"],
    category: "Info",
    description: "You probably know what this does",
    usage: "`<help`",
    run: async (bot, msg, args) => {

        let data = await serverPrefix.findOne({ GuildID: msg.channel.guild.id });

        let prefix = data.Prefix || "<";

        if (args[0] === "commands") {
            msg.channel.sendTyping()
            const embed = new MessageEmbed()
            .setColor("#ff0080")
            .setTitle("Available Commands :sparkles:")
            .setThumbnail(bot.user.dynamicAvatarURL("png", 1548))
            .setDescription(`List of all commands currently available and supported.\n\nCurrent bot prefix: **${prefix}**\nTotal Commands: **21**`)
            .addField("Anime", "`airwaifu` | `gallery` | `maidpic` | `neko` | `safebooru` | `whatanime` |")
            .addField("Utility", "`avatar` | `github` | `whatprefix` | `setprefix` | `resetprefix` |")
            .addField("Info", "`achievements` | `help` | `ping` | `status` |")
            .addField("Fun", "`say` | `reverse` | `fortune` |")
            .addField("Moderation", "`purge` | `ban` | `kick` |")
            msg.channel.createMessage({ embed: embed.code });
        } else if (args[0]) {
            msg.channel.sendTyping()
            return getCMD(bot, msg, args[0]);
        } else {
        msg.channel.sendTyping()
        const embed = new MessageEmbed()
        .setColor("#ff0080")
        .setTitle("Fuitai Help")
        .setThumbnail(bot.user.dynamicAvatarURL("png", 1548))
        .setDescription("A Help menu of all my functions and commands.")
        .addField(":sos: Assistance", "[Support Server](https://www.youtube.com/watch?v=dQw4w9WgXcQ)")
        .addField(":heart_decoration: Add me", "[Invite me to your server~](https://discord.com/api/oauth2/authorize?client_id=814831004527099921&permissions=1342565494&scope=bot)")
        .addField("<:xrare:811613796611129394> Donate", "[PayPal](https://www.paypal.com/paypalme/808Jimmy) <:paypal:812124200483422228>")
        .addField(":hash: Command List", "`<help commands`")
        .addField(":coffee: Is this tiny box not enough for you?", "Try any of these:\n[`<help <command>`] | [`<help commands`]")
        msg.channel.createMessage({ embed: embed.code });
        }
    }
}

function getCMD(bot, msg, input) {
    const embed = new MessageEmbed()

    // Get the cmd by the name or alias
    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

    let info = `No information found for command: **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        embed.setColor("#ff0000").setDescription(info)
        return msg.channel.createMessage({ embed: embed.code });
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    embed.setColor("#008f39").setDescription(info)
    return msg.channel.createMessage({ embed: embed.code });
}

