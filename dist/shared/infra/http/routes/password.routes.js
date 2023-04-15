"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;
var _ResetUserPasswordController = require("@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController");
var _SendForgotPasswordMailController = require("@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");
var _express = require("express");
const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordMailController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetUserPasswordController = new _ResetUserPasswordController.ResetUserPasswordController();
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);