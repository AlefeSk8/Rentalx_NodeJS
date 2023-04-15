"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;
var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");
var _IRentalsRepository = require("@modules/rentals/repositories/IRentalsRepository");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("@shared/errors/AppError");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RentalsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalsRepository.IRentalsRepository === "undefined" ? Object : _IRentalsRepository.IRentalsRepository, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository, typeof _DayjsDateProvider.DayjsDateProvider === "undefined" ? Object : _DayjsDateProvider.DayjsDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dayjsDateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dayjsDateProvider = dayjsDateProvider;
  }
  async execute({
    id,
    user_id
  }) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;
    if (!rental) {
      throw new _AppError.AppError("Rental does not exists!");
    }
    ;
    const dateNow = this.dayjsDateProvider.dateNow();
    let daily = this.dayjsDateProvider.compareInDays(rental.start_date, this.dayjsDateProvider.dateNow());
    if (daily <= 0) {
      daily = minimum_daily;
    }
    ;
    const delay = this.dayjsDateProvider.compareInDays(rental.expected_return_date, dateNow);
    console.log(delay);
    let total = 0;
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }
    ;
    total += daily * car.daily_rate;
    rental.end_date = this.dayjsDateProvider.dateNow();
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);
    return rental;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;
;