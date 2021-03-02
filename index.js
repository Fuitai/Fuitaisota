const Eris = require("eris");
const fs = require("fs");
const { TOKEN } = require("./config.json");

var bot = new Eris(TOKEN);

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://JimmyYFreddy:DHhqrYoem148Slkr@cluster0.tbemg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

bot.events = new Eris.Collection();
bot.commands = new Eris.Collection();
bot.aliases = new Eris.Collection();
bot.categories = fs.readdirSync("./commands/");

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    console.log(`Loaded Event - ${eventName}`);
    bot.on(eventName, event.bind(null, bot));
}

["command"].forEach(handler => {
  require(`./handler/${handler}`)(bot);
});

bot.connect();

process.on("unhandledRejection", (err) => {
  console.error(err);
});
