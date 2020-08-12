const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const { Permissions } = require('discord.js');
const snekfetch = require('snekfetch');

bot.once('ready', () => {
	console.log('Your bug testing pal is starting up')
  bot.user.setActivity("Ready for testing | !help");
  console.log('Ready for Action!')
});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.content.indexOf(prefix) !== 0) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	if (command === 'ping') {
		message.channel.send('pinging you in 3 seconds')
		setTimeout(ping, 3000)
		function ping() {
			message.reply("Ping!")
		}
	}
	if (command === 'clear') {
		if (message.member.permissions.has('ADMINISTRATOR')) {
			const amount = parseInt(args[0]);
			if (isNaN(amount)) {
				return message.reply('That doesn\'t seem to be a valid number.');
			}
			else if (amount < 2 || amount > 100) {
				return message.reply('You need to input a number between 2 and 100.');
			}
			message.channel.bulkDelete(amount)
				.catch(error => message.reply(`:redTick: Couldn't delete messages because of **${error}** \n Please make sure I have permission to manage messages`))
			setTimeout(DeletThis, 3000)
			message.channel.send(`:white_check_mark: Success! Deleted ${amount} message(s)!`)
		 function DeletThis() {
			 message.channel.bulkDelete(1)
		 }
		}
		if (message.member.permissions.has('ADMINISTRATOR') === false){
			return message.reply(`:redTick: You don\'t seem to have the permission to do this please contact **${message.guild.name}\'s** admins for help`)
		}
  }
	//Kick
	if(command === 'kick'){
		if(message.member.permissions.has('KICK_MEMBERS')) {
			const member = message.mentions.members.first();
			if (member === undefined){
				return message.reply('You need to tag a member to kick them')
			}
			member.kick();
			return message.channel.send(`${member} has been kicked, *don't let the door hit you on the way out*`)
		}
		if (message.member.permissions.has('KICK_MEMBERS') === false){
			return message.reply(`You don\'t seem to have permission to do this command. Please contact **${message.guild.name}\'s** admins for help`)
		}
	}

	if (command === 'dm') {
		message.author.send(`DM ping :^)`);
	}
	if (command === '3secdm') {
		message.channel.send('DMing you in 3 seconds');
		setTimeout(DmMe, 3000);
		function DmMe() {
			message.author.send(`delayed DM ping :^)`);
		}
	}
	if (command === '5secdm') {
		message.channel.send('DMing you in 5 seconds');
		setTimeout(DmMe, 5000);
		function DmMe() {
			message.author.send(`delayed DM ping :^)`);
		}
	}
	if (command === 'youtube'){
		message.channel.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
	}
	if (command === 'pic'){
		message.channel.send(new Discord.Attachment('./testImages/omegalul.png', 'omegalul.png'))
		.catch(error => message.reply(`:redTick: faied to send image because of **${error}**`));
	}
	if (command === 'lag'){
		const m = await message.channel.send("Checking Ping");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}
  if (command === 'help') {
    const helpEmbed = new Discord.RichEmbed()
  	.setColor('#3690f7')
  	.setTitle(`BugTest Pal's Commands! (note these are case sensitive)`)
  	.addField('clear:', 'Enter a number after this command to mass delete messages')
		.addField('ping:', ' Waits 3 seconds then pings you')
		.addField('dm, 3secdm, 5secdm:', 'Sends a DM to you instantly/waits 3sec/waits 5sec')
		.addField('youtube:', 'sends a youtube video')
		.addField('pic', 'sends an uploaded picture')
		.addField('gif (WIP)', 'sends an uploaded gif')
		.addField('linked pic (WIP)', 'sends a picture through an imgur link')
		.addField('linked gif (WIP)', 'sends a gif through an imgur link')
		.addField('lag', 'Shows you the ping')
		.setFooter('Bot made by GlenMerlin');
    message.channel.send(helpEmbed)
    }
});
bot.login(token);
