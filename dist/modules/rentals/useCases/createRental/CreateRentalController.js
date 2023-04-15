"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;
var _CreateRentalUseCase = require("./CreateRentalUseCase");
var _tsyringe = require("tsyringe");
class CreateRentalController {
  async handle(request, response) {
    const {
      expected_return_date,
      car_id
    } = request.body;
    const {
      id
    } = request.user;
    const createRentalUseCase = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({
      user_id: id,
      car_id,
      expected_return_date
    });
    return response.status(201).json(rental);
  }
}
exports.CreateRentalController = CreateRentalController;
;