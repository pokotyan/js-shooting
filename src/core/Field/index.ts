import { Shot } from "../Shot";
import { Bot } from "../Bot";
import { BotCommand } from "../Command";
import { Controller } from "../Controller";

export class Field {
  public player: Bot;
  public enemy: Bot;
  public shots: Shot[];

  constructor({ player, enemy }: { player: Bot; enemy: Bot }) {
    this.player = player;
    this.enemy = enemy;
    this.shots = [];
  }

  // public playerMovePhease() {
  //   this.player.move();
  // }

  public playerAttackPhease() {
    this.player.attack(this.enemy);
  }

  // public enemyMovePhease() {
  //   this.enemy.move();
  // }

  public enemyAttackPhease() {
    this.enemy.attack(this.player);
  }

  // public addShots(shot: Shot) {
  //   this.shots.push(shot);
  // }

  // public shotsMovePhease() {
  //   this.shots.forEach(s => {
  //     s.move();
  //   });
  // }
}

export const genField = () => {
  const controller = new Controller({ command: new BotCommand() });

  return new Field({
    player: new Bot({
      controller,
      // x: 23,
      // y: 178,
      // color: "blue",
      hp: 100,
      mp: 80
    }),
    enemy: new Bot({
      controller,
      // x: 500,
      // y: 170,
      // color: "red",
      hp: 300,
      mp: 200
    })
  });
};
