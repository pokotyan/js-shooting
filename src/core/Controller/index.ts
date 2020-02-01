import { Atk, Def, Charge } from "../Action";

export class Controller {
  public commands: {
    atk: Atk[];
    def: Def[];
    charge: Charge[];
  };

  constructor() {
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

  public execute(cb: () => void) {
    // チャージを実行する場合、他の行動は取らせない
    if (this.commands.charge.length) {
      this.resetAtkCommand();
      this.resetDefCommand();
    }

    cb();

    this.resetAtkCommand();
    this.resetDefCommand();
    this.resetChargeCommand();
  }

  public attack() {
    this.commands.atk.push(new Atk({ value: 50 }));
  }

  public guard() {
    this.commands.def.push(new Def({ value: 30 }));
  }

  public charge() {
    this.commands.charge.push(new Charge({ value: 2 }));
  }
}
