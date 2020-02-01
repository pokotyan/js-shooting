import { BotCommand } from "../Command";
import { Atk, Def, Charge } from "../Action";

export class Controller {
  public command: BotCommand;
  public commands: {
    atk: Atk[];
    def: Def[];
    charge: Charge[];
  };

  constructor({ command }: { command: BotCommand }) {
    this.command = command;
    this.commands = {
      atk: [],
      def: [],
      charge: []
    };
  }

  public log(message: string) {
    console.log(message);
  }

  public resetAtkCommand() {
    this.commands.atk = [];
  }

  public resetDefCommand() {
    this.commands.def = [];
  }

  public resetChargeCommand() {
    this.commands.charge = [];
  }

  public attack() {
    this.commands.atk.push(this.command.attack());
  }

  public guard() {
    this.commands.def.push(this.command.guard());
  }

  public charge() {
    this.commands.charge.push(this.command.charge());
  }
}
