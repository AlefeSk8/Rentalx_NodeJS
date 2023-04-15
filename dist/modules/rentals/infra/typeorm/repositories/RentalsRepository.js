"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;
var _Rental = require("../entities/Rental");
var _dataSource = _interopRequireDefault(require("@shared/infra/typeorm/data-source"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _dataSource.default.getRepository(_Rental.Rental);
  }
  async findOpenRentalByCar(car_id) {
    return await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
  }
  async findOpenRentalByUser(user_id) {
    return await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total
  }) {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }
  async findById(id) {
    return await this.repository.findOneBy({
      id
    });
  }
  async findAllByUser(user_id) {
    return await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
  }
}
exports.RentalsRepository = RentalsRepository;
;