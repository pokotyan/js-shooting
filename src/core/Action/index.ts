export interface Action {
  type: string;
  val: number;
}

export class Atk implements Action {
  private value: number;

  constructor({ value }: { value: number }) {
    this.value = value;
  }

  get type() {
    return "Atk";
  }

  get val() {
    return this.value;
  }
}

export class Def implements Action {
  private value: number;

  constructor({ value }: { value: number }) {
    this.value = value;
  }

  get type() {
    return "Def";
  }

  get val() {
    return this.value;
  }
}

export class Charge implements Action {
  private value: number;

  constructor({ value }: { value: number }) {
    this.value = value;
  }

  get type() {
    return "Charge";
  }

  get val() {
    return this.value;
  }
}
