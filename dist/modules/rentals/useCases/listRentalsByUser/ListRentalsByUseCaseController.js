"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserController = void 0;
var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");
var _tsyringe = require("tsyringe");
class ListRentalsByUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;
    const listRentalsByUserUseCase = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUserUseCase);
    const rentalsOfUser = await listRentalsByUserUseCase.execute(id);
    return response.json(rentalsOfUser);
  }
}
exports.ListRentalsByUserController = ListRentalsByUserController;
;