import { type HellConfig } from "./HellConfig.ts";
import { type Command } from "./Command.ts";
import {
  Client,
  Events,
  GatewayIntentBits,
  Interaction,
  WebhookClient,
} from "discord";
import { Collection, Err, Ok, Result } from "unwrap";
import HellLog from "./HellLog.ts";
import {
  registerCommands,
  registerGuildCommands,
} from "./procedures/registerSlashCommands.ts";

export type Core = {
  client: HellCore["client"];
  logger: HellCore["logger"];
  addChatInputCommand: HellCore["addChatInputCommand"];
};

export default class HellCore {
  chatInputCommands: Collection<string, Command>;
  chatInputGuildCommands: Collection<string, Command>;
  client: Client;
  logger: HellLog;

  constructor(config: HellConfig) {
    this.chatInputCommands = new Collection();
    this.chatInputGuildCommands = new Collection();

    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    });

    this.logger = new HellLog(
      new WebhookClient({
        id: config.botlog.id,
        token: config.botlog.token,
      }),
    );

    this.client.once(Events.ClientReady, (client: Client<true>) => {
      this.logger.log(`Logged in as ${client.user.tag}.`);
    });

    this.client.on(Events.InteractionCreate, (interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) {
        return;
      }

      const command = this.chatInputCommands.get(interaction.commandName);
      if (command.isNone()) {
        this.logger.error(`Command '${interaction.commandName}' not found.`);
        return;
      }

      try {
        command.unwrap().execute(interaction);
      } catch (error) {
        this.logger.error(error.message, error);
      }
    });
  }

  async setup(): Promise<void> {
    await this.loadFeatures();
    await registerCommands([
      ...this.chatInputCommands.map((c) => c.data).values(),
    ]);
    await registerGuildCommands([
      ...this.chatInputCommands.map((c) => c.data).values(),
    ]);
  }

  async loadFeatures(path = `${Deno.cwd()}/features`): Promise<void> {
    for await (const dir of Deno.readDir(path)) {
      if (!dir.isDirectory) {
        continue;
      }

      const feature = (await import(`${path}/${dir.name}/index.ts`)).default;
      try {
        feature.setup(
          {
            client: this.client,
            logger: this.logger,
            addChatInputCommand: this.addChatInputCommand.bind(this),
          } satisfies Core,
        );
      } catch (error) {
        this.logger.error(error.message, error);
      }
    }
  }

  addChatInputGuildCommand(command: Command): Result<void, string> {
    if (this.chatInputGuildCommands.has(command.data.name)) {
      const error = `Guild command '${command.data.name}' already registered.`;
      this.logger.error(error);

      return Err(error);
    }
    this.chatInputGuildCommands.set(command.data.name, command);

    return Ok(undefined);
  }

  addChatInputCommand(command: Command): Result<void, string> {
    if (this.chatInputCommands.has(command.data.name)) {
      const error = `Command '${command.data.name}' already registered.`;
      this.logger.error(error);

      return Err(error);
    }
    this.chatInputCommands.set(command.data.name, command);

    return Ok(undefined);
  }

  login(token: string): Promise<string> {
    return this.client.login(token);
  }
}
