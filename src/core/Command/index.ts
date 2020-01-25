export class BotCommand {
  public atk: number = 0;
  public def: number = 0;

  public reset() {
    this.atk = 0;
  }

  public attack() {
    this.atk = this.atk += 50;
  }

  public guard() {
    this.def = this.def += 30;
  }
}
