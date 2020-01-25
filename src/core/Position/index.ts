import { BotCommand } from "../Command";

export class Position {
  public x: number = 0;
  public y: number = 100;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(command: BotCommand) {
    this.x = this.x + command.x;
    this.y = this.y + command.y;
  }
}
