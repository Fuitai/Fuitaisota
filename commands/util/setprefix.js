let prefixModel = require("../../database/schematics/prefix.js");

module.exports = {
    name: "setprefix",
    category: "util",
    description: "changes my prefix on this server!",
    usage: "`<setprefix <prefix>`",

    run: async (bot, msg, args) => {
    const data = await prefixModel.findOne({
        GuildID: msg.channel.guild.id
    });

    if (!args[0]) {
return msg.channel.createMessage('You must provide a **new prefix**!')
}

else if (args[0].length > 5) {
 return msg.channel.createMessage('Your new prefix must be under \`5\` characters!')

} else {

data.Prefix = args[0]
await data.save().catch(e => console.log(e))    
     msg.channel.createMessage(`The new prefix is now **\`${args[0]}\`**`);

}

}
}
