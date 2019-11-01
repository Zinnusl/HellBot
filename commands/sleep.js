const Command = require('../command');

class Sleep extends Command {
	constructor(client) {
		super(client);
		this.trigger = ['sleep', 'schlaf'];
		this.info.description = 'Makes me unresponsive.';
		this.icon = '<:zzz:597864891579105290>';
		this.accessLevel = 0;
	}

	execute(args, message) {
		this.client.awake = false;
		message.reply('good night...');
	}
}

module.exports = Sleep;