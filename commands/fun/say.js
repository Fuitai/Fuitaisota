module.exports = {
    name: "say",
   aliases: ["tell", "sa", "msgxd"],
   category: "fun",
    description: "Says whatever you ask her",

   run: (bot, msg, args) => {

    msg.delete().catch(O_o=>{}); 
    if(!args[0]) return msg.channel.createMessage("I'm alive :) ||but you must tell me what should I say!~||");

    const saymsg = args.join(" ");
    
    msg.delete().catch(O_o=>{}); 

    msg.channel.createMessage(saymsg);

  }
}
