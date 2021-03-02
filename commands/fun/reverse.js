
module.exports = {
  name: 'reverse',
  aliases: [],
  group: 'fun',
  description: 'Reverses the supplied text',
  examples: [
    'reverse This text will be reversed.'
  ],
  run: (bot, msg, args) => {

    msg.channel.createMessage(args.join('').split('').reverse().join('') || 'No text to reverse~!')
  }
};