import { Controller } from "../Controller";
import { Dump } from "../Dump";

const MAX_AP = 5;

export class Bot {
  public controller: Controller;
  public name: string;
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
  public def: number;
  public dump: Dump;

  constructor({
    controller,
    name,
    hp,
    mp,
    ap,
    def
  }: {
    controller: Controller;
    name: string;
    hp: number;
    mp: number;
    ap: number;
    def: number;
  }) {
    this.controller = controller;
    this.name = name;
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
    this.def = def;
    this.dump = new Dump({
      name: this.name,
      hp: this.hp.current,
      action: []
    })
  }

  // @todo ダメージ計算用のクラス作る
  private calcDamage(bot: Bot, power: number) {
    const damage = Math.max(power - bot.def, 0);

    bot.def = 0;

    return damage;
  }

  public addAP(ap: number) {
    this.ap.current = Math.min(this.ap.current + ap, MAX_AP);
  }

  private subtractAP() {
    this.ap.current = Math.max(this.ap.current - 1, 0);
  }

  private doGuard(power: number) {
    this.def += power;
  }

  private doAttack(bot: Bot, power: number) {
    const damage = this.calcDamage(bot, power);

    bot.hp.current = Math.max(bot.hp.current - damage, 0);

    return damage;
  }

  public attack(bot: Bot) {
    this.controller.commands.atk.forEach(atk => {
      if (this.ap.current) {
        const damage = this.doAttack(bot, atk.val);
        this.dump.attack(damage);
      }

      this.subtractAP();
    });
  }

  public guard() {
    this.controller.commands.def.forEach(def => {
      if (this.ap.current) {
        this.doGuard(def.val);
        this.dump.guard(def.val);
      }

      this.subtractAP();
    });
  }

  public charge() {
    this.controller.commands.charge.forEach(c => {
      this.addAP(c.val);
      this.dump.charge(c.val);
    });
  }
}
