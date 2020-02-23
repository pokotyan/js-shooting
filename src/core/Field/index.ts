import { Bot } from "../Bot";
// import { BotCommand } from "../Command";
import { Controller } from "../Controller";
import { ControllerManager } from "../ControllerManager";

export class Field {
  private controllerManager: ControllerManager;
  public player: Bot;
  public enemy: Bot;

  constructor({ player, enemy }: { player: Bot; enemy: Bot }) {
    this.controllerManager = new ControllerManager();
    this.player = player;
    this.enemy = enemy;
  }

  public prePhease() {
    this.player.dump.reset(this.player.hp.current);
    this.enemy.dump.reset(this.enemy.hp.current);
  }

  public playerPhease() {
    this.prePhease();
    this.controllerManager.execute(this.player.controller, () => {
      this.player.charge();
      this.player.attack(this.enemy);
      this.player.guard();
    });
  }

  public enemyPhease() {
    this.prePhease();
    this.controllerManager.execute(this.enemy.controller, () => {
      this.enemy.charge();
      this.enemy.attack(this.player);
      this.enemy.guard();
    });
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
      controller: new Controller(),
      name: "ピカチュー",
      hp: 100,
      mp: 80,
      ap: 1,
      def: 0
    }),
    enemy: new Bot({
      controller: new Controller(),
      name: "スヌーピー",
      hp: 200,
      mp: 200,
      ap: 1,
      def: 0
    })
  });

  return field;
};
