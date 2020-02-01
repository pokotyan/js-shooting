import { Bot } from "../Bot";
import { BotCommand } from "../Command";
import { Controller } from "../Controller";
import { Dump } from "../Dump";

export class Field {
  public player: Bot;
  public enemy: Bot;
  public snapShot: {
    player: Dump;
    enemy: Dump;
  };

  constructor({ player, enemy }: { player: Bot; enemy: Bot }) {
    this.player = player;
    this.enemy = enemy;
    this.snapShot = {
      player: new Dump({
        name: player.name,
        hp: player.hp.current,
        action: []
      }),
      enemy: new Dump({ name: enemy.name, hp: enemy.hp.current, action: [] })
    };
  }

  public prePhease() {
    this.snapShot.player.reset(this.player.hp.current);
    this.snapShot.enemy.reset(this.enemy.hp.current);
  }

  public playerPhease() {
    this.prePhease();
    this.player.attack(this.enemy, this.snapShot.player);
    this.player.guard(this.snapShot.player);
    this.player.charge(this.snapShot.player);
  }

  public enemyPhease() {
    this.prePhease();
    this.enemy.attack(this.player, this.snapShot.enemy);
    this.enemy.guard(this.snapShot.enemy);
    this.enemy.charge(this.snapShot.enemy);
  }

  public endPhease() {
    this.player.addAP(1);
    this.enemy.addAP(1);
  }

  public checkFinish() {
    if (!this.player.hp.current) {
      return {
        win: false,
        lose: true
      };
    }

    if (!this.enemy.hp.current) {
      return {
        win: true,
        lose: false
      };
    }

    return {
      win: false,
      lose: false
    };
  }
}

export const genField = () => {
  const field = new Field({
    player: new Bot({
      controller: new Controller({ command: new BotCommand() }),
      name: "ピカチュー",
      hp: 100,
      mp: 80,
      ap: 1,
      def: 0
    }),
    enemy: new Bot({
      controller: new Controller({ command: new BotCommand() }),
      name: "スヌーピー",
      hp: 200,
      mp: 200,
      ap: 1,
      def: 0
    })
  });

  return field;
};
