import { Action, Atk, Def, Charge } from "../Action";

export class Dump {
  public name: string;
  public hp: number;
  public action: Action[];

  constructor({
    name,
    hp,
    action
  }: {
    name: string;
    hp: number;
    action: any[];
  }) {
    this.name = name;
    this.hp = hp;
    this.action = action;
  }

  reset(hp: number) {
    this.hp = hp;
    this.action = [];
  }

  attack(damage: number) {
    this.action.push(new Atk({ value: damage }));
  }

  guard(def: number) {
    this.action.push(new Def({ value: def }));
  }

  charge(ap: number) {
    this.action.push(new Charge({ value: ap }));
  }
}
