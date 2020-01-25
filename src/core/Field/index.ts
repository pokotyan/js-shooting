import { Bot } from "../Bot";
import { BotCommand } from "../Command";
import { Controller } from "../Controller";

export class Field {
  public player: Bot;
  public enemy: Bot;
  public dump: {
    player: any;
    enemy: any;
  }

  constructor({ player, enemy }: { player: Bot; enemy: Bot }) {
    this.player = player;
    this.enemy = enemy;
    this.dump = {
      player,
      enemy
    }
  }

  public prePhease() {
    this.dump = {
      player: {
        hp: this.player.hp.current
      },
      enemy: {
        hp: this.enemy.hp.current
      },
    }
  }

  public playerPhease() {
    this.prePhease();
    this.player.attack(this.enemy);
  }

  public enemyPhease() {
    this.prePhease();
    this.enemy.attack(this.player);
  }
}

export const genField = () => {
  const field = new Field({
    player: new Bot({
      controller: new Controller({ command: new BotCommand() }),
      hp: 100,
      mp: 80,
      ap: 1
    }),
    enemy: new Bot({
      controller: new Controller({ command: new BotCommand() }),
      hp: 300,
      mp: 200,
      ap: 1
    })
  });

  return field;
};
