import { BotCommand } from "../Command";

export class Controller {
  public command: BotCommand;

  constructor({ command }: { command: BotCommand }) {
    this.command = command;
  }

  public log(message: string) {
    console.log(message);
  }

  public attack() {
    this.command.attack();
  }

  public guard() {
    this.command.guard();
  }
}
