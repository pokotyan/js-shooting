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

  private defenceUP(power: number) {
    this.def += power;
  }

  private doDamage(bot: Bot, power: number) {
    const damage = this.calcDamage(bot, power);

    bot.hp.current = Math.max(bot.hp.current - damage, 0);

    return damage;
  }

  public attack(bot: Bot, snapShot: Dump) {
    if (this.controller.commands.charge.length) {
      return;
    }

    this.controller.commands.atk.forEach(atk => {
      if (this.ap.current) {
        const damage = this.doDamage(bot, atk.val);
        snapShot.addAtk(damage);
      }

      this.subtractAP();
    });

    this.controller.resetAtkCommand();
  }

  public guard(snapShot: Dump) {
    if (this.controller.commands.charge.length) {
      return;
    }

    this.controller.commands.def.forEach(def => {
      if (this.ap.current) {
        this.defenceUP(def.val);
        snapShot.addDef(def.val);
      }

      this.subtractAP();
    });

    this.controller.resetDefCommand();
  }

  public charge(snapShot: Dump) {
    this.controller.commands.charge.forEach(c => {
      this.addAP(2);
      snapShot.addCharge(c.val);
    });

    this.controller.resetChargeCommand();
  }
}
