"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;
var _Car = require("@modules/cars/infra/typeorm/entities/Car");
class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }
  async findAvailable(brand, name, category_id) {
    const cars = this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || name && car.name === name || category_id && car.category_id === category_id) {
        return car;
      }
      ;
      return null;
    });
    return cars;
  }
  async findById(id) {
    return this.cars.find(car => car.id === id);
  }
  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }
}
exports.CarsRepositoryInMemory = CarsRepositoryInMemory;