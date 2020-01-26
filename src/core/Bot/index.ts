import { Controller } from "../Controller";

const MAX_AP = 5;

export class Bot {
  public controller: Controller;
  public hp: {
    max: number;
    current: number;
  };
  public mp: {
    max: number;
    current: number;
  };
  public ap: {
    max: number;
    current: number;
  };

  constructor({
    controller,
    hp,
    mp,
    ap
  }: {
    controller: Controller;
    hp: number;
    mp: number;
    ap: number;
  }) {
    this.controller = controller;
    this.hp = {
      max: hp,
      current: hp
    };
    this.mp = {
      max: mp,
      current: mp
    };
    this.ap = {
      max: MAX_AP,
      current: ap
    };
  }

  // @todo ダメージ計算用のクラス作る
  private calcDamage(bot: Bot, power: number) {
    const damage = Math.max(
      power - bot.controller.command.def,
      0
    );

    bot.controller.command.def = 0;

    return damage;
  }

  public addAP() {
    this.ap.current = Math.min(this.ap.current + 1, MAX_AP);
  }

  public subtractAP() {
    this.ap.current = Math.max(this.ap.current - 1, 0);
  }

  public doDamage(bot: Bot, power: number) {
    const damage = this.calcDamage(bot, power);

    bot.hp.current = Math.max(bot.hp.current - damage, 0);
  }

  public attack(bot: Bot) {
    this.controller.commands.atk.forEach(power => {
      if (this.ap.current) {
        this.doDamage(bot, power);
      }

      this.subtractAP();
    })

    this.controller.command.reset();
  }
}
