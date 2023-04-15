"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;
var _Car = require("../entities/Car");
var _dataSource = _interopRequireDefault(require("@shared/infra/typeorm/data-source"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.default.getRepository(_Car.Car);
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
    const car = this.repository.create({
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
    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate) {
    return await this.repository.findOneBy({
      license_plate
    });
  }
  async findAvailable(brand, name, category_id) {
    const carsQuery = this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });
    if (brand) {
      carsQuery.andWhere("brand = :brand", {
        brand
      });
    }
    if (name) {
      carsQuery.andWhere("name = :name", {
        name
      });
    }
    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id
      });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
  async findById(id) {
    return await this.repository.findOneBy({
      id
    });
  }
  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }
}
exports.CarsRepository = CarsRepository;
;