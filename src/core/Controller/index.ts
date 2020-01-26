import { BotCommand } from "../Command";

export class Controller {
  public command: BotCommand;
  public commands: {
    atk: number[]
  };

  constructor({ command }: { command: BotCommand }) {
    this.command = command;
    this.commands = {
      atk: []
    };
  }

  public log(message: string) {
    console.log(message);
  }

  public reset() {
    this.commands.atk = []    
  }

  public attack() {
    this.commands.atk.push(this.command.attack());
  }

  public guard() {
    this.command.guard();
  }
}
