import { BotCommand } from "../Command";

export class Controller {
  public command: BotCommand;
  public commands: {
    atk: number[],
    def: number[]
  };

  constructor({ command }: { command: BotCommand }) {
    this.command = command;
    this.commands = {
      atk: [],
      def: []
    };
  }

  public log(message: string) {
    console.log(message);
  }

  public resetATK() {
    this.commands.atk = []    
  }

  public attack() {
    this.commands.atk.push(this.command.attack());
  }

  public guard() {
    this.commands.def.push(this.command.guard());
  }
}
