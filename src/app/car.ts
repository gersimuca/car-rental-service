export class Car {
  carModule: string;

  constructor(carModule: string) {
    this.carModule = carModule;
  }

  public get carType(): string {
    return this.carModule;
  }

  public set carType(module: string) {
    this.carModule = module;
  }
}
