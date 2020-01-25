export class BotCommand {
  public x: number = 0;
  public y: number = 0;
  public shots: number = 0;
  public attackPower: number = 0;

  public reset() {
    this.x = 0;
    this.y = 0;
    this.attackPower = 0;
  }

  public advance() {
    this.x = 48;
  }

  public ascent() {
    this.y = 1;
  }

  public attack() {
    this.attackPower = this.attackPower += 50;
  }
}
