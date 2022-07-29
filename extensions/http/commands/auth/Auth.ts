import { CommandInteraction, InteractionResponse } from 'discord.js';
import Command from '#core/abstracts/Command';
import HellCore from '#core/HellCore';


export default class Auth extends Command {
	constructor(core: HellCore) {
		super(core, __dirname);
	}

	async execute(interaction: CommandInteraction): Promise<InteractionResponse<boolean>> {
		const reply = this.$t('source', 'description');

		return interaction.reply(reply);
	}
}
