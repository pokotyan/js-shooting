import { Atk, Def, Charge } from "../Action";

export class BotCommand {
  public attack() {
    return new Atk({ value: 50 });
  }

  public guard() {
    return new Def({ value: 30 });
  }

  public charge() {
    return new Charge({ value: 2 });
  }
}
