import { Controller } from "../Controller";

export class ControllerManager {
  private resetAtkCommand(controller: Controller) {
    controller.commands.atk = [];
  }

  private resetDefCommand(controller: Controller) {
    controller.commands.def = [];
  }

  private resetChargeCommand(controller: Controller) {
    controller.commands.charge = [];
  }

  public execute(controller: Controller, cb: () => void) {
    // チャージを実行する場合、他の行動は取らせない
    if (controller.commands.charge.length) {
      this.resetAtkCommand(controller);
      this.resetDefCommand(controller);
    }

    cb();

    this.resetAtkCommand(controller);
    this.resetDefCommand(controller);
    this.resetChargeCommand(controller);
  }
}
