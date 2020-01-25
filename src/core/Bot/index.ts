// import { BotCommand } from "../Command";
import { Position } from "../Position";
import { Controller } from "../Controller";
import { Field } from "../Field";
import { Shot } from "../Shot";

export class Bot {
  public controller: Controller;
  // public position: Position;
  // public color: string;
  public hp: {
    max: number;
    current: number;
  };
  public mp: {
    max: number;
    current: number;
  };

  constructor({
    controller,
    // x,
    // y,
    // color,
    hp,
    mp
  }: {
    controller: Controller;
    // x: number;
    // y: number;
    // color: string;
    hp: number;
    mp: number;
  }) {
    this.controller = controller;
    // this.position = new Position(x, y);
    // this.color = color;
    this.hp = {
      max: hp,
      current: hp
    };
    this.mp = {
      max: mp,
      current: mp
    };
  }

  // public move() {
  //   this.position.add(this.controller.command);
  //   this.controller.command.reset(); // 移動が終わったら、移動した分のコマンドはリセットする
  // }

  public doDamage(bot: Bot, power: number) {
    bot.hp.current = bot.hp.current - power;
  }

  public attack(bot: Bot) {
    const power = this.controller.command.attackPower;

    this.doDamage(bot, power);

    this.controller.command.reset();
  }
}
