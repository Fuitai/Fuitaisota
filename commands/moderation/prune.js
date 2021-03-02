module.exports = {
    name: 'purge',
    aliases: ["prune"],
    description: 'Prune up to 99 messages.',
    run: async (bot, msg, args) => {

           let deletePerms = msg.channel.guild.members.get(msg.author.id).permission.has("manageMessages");
        if(!deletePerms) {
            return msg.channel.createMessage("You don't have permissions to do this. You need **Manage Messages**!");
        }
        
        let botdeletePerms = msg.channel.guild.members.get(bot.user.id).permission.has("manageMessages");
        if(!botdeletePerms) {
            return msg.channel.createMessage("I don't have permissions to do this. I need **Manage Messages**! Please contact an administrator of this server~");
        }
          
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return msg.channel.createMessage(`That doesn\'t seem to be a valid number!`);
        } else if (amount <= 1 || amount > 100) {
            return msg.channel.createMessage(`You need to input a number between 1 and 99!`);
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        await msg.channel.purge(deleteAmount)
        let message = await msg.channel.createMessage(`I deleted \`${deleteAmount}\` messages.`)
          setTimeout(() => {
            message.delete()
          }, 5000)
    }
}