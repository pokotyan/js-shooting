export class BotCommand {
  public atk: number = 0;
  public def: number = 0;

  public reset() {
    this.atk = 0;
  }

  public attack() {
    return 50;
  }

  public guard() {
    this.def = this.def += 30;
  }
}
