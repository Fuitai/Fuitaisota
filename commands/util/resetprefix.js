let prefixModel = require("../../database/schematics/prefix.js");

module.exports = {
    name: "resetprefix",


    run: async (bot, msg, args) => {

        let defaultprefix = "<";
    const data = await prefixModel.findOne({
        GuildID: msg.channel.guild.id
    });

    if (data) {
        await prefixModel.findOneAndRemove({
            GuildID: msg.channel.guild.id
        })
        
        msg.channel.createMessage(`The prefix is now **<**`);


        let newData = new prefixModel({
            Prefix: defaultprefix,
            GuildID: msg.channel.guild.id
        })
        newData.save();
    } else if (!data) {
        msg.channel.createMessage(`The prefix is now **<**`);

        let newData = new prefixModel({
            Prefix: defaultprefix,
            GuildID: msg.channel.guild.id
        })
        newData.save();
    }

}
}
