module.exports = {
    name: "pid",
    category: "admin",
    description: "See the current process pid of the bot.",
    run: async (bot, msg, args) => {

        msg.channel.createMessage(`<@${msg.author.id}>, ${process.pid}`);

    }
}