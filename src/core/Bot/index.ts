import { Controller } from "../Controller";

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
      max: 5,
      current: ap
    };
  }

  // @todo ダメージ計算用のクラス作る
  private calcDamage(bot: Bot) {
    const damage = Math.max(
      this.controller.command.atk - bot.controller.command.def,
      0
    );

    bot.controller.command.def = 0;

    return damage;
  }

  public doDamage(bot: Bot) {
    const damage = this.calcDamage(bot);

    bot.hp.current = Math.max(bot.hp.current - damage, 0);
  }

  public attack(bot: Bot) {
    this.doDamage(bot);

    this.controller.command.reset();
  }
}
