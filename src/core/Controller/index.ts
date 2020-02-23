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
