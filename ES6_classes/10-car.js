export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  cloneCar() {
    const ClonedClass = this.constructor[Symbol.species];
    return new ClonedClass();
  }

  static get [Symbol.species]() {
    return this;
  }
}
