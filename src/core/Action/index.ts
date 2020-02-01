export interface Action {
  val: number;
}

export class Atk implements Action {
  private value: number;

  constructor({ value }: { value: number }) {
    this.value = value;
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

  get val() {
    return this.value;
  }
}

export class Charge implements Action {
  private value: number;

  constructor({ value }: { value: number }) {
    this.value = value;
  }

  get val() {
    return this.value;
  }
}
