"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetUserPasswordController = void 0;
var _ResetUserPasswordUseCase = require("./ResetUserPasswordUseCase");
var _tsyringe = require("tsyringe");
class ResetUserPasswordController {
  async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;
    const resetUserPasswordUseCase = _tsyringe.container.resolve(_ResetUserPasswordUseCase.ResetUserPasswordUseCase);
    await resetUserPasswordUseCase.execute({
      token: String(token),
      password
    });
    return response.send();
  }
}
exports.ResetUserPasswordController = ResetUserPasswordController;
;