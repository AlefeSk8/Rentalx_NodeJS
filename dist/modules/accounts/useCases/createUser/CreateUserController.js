"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;
var _CreateUserUseCase = require("./CreateUserUseCase");
var _tsyringe = require("tsyringe");
class CreateUserController {
  async handle(request, response) {
    const {
      name,
      password,
      email,
      driver_license,
      avatar
    } = request.body;
    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);
    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
      avatar
    });
    return response.status(201).send();
  }
}
exports.CreateUserController = CreateUserController;
;