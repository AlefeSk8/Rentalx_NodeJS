"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalsRoutes = void 0;
var _express = require("express");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
var _CreateRentalController = require("@modules/rentals/useCases/createRental/CreateRentalController");
var _DevolutionRentalController = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalController");
var _ListRentalsByUseCaseController = require("@modules/rentals/useCases/listRentalsByUser/ListRentalsByUseCaseController");
const rentalsRoutes = (0, _express.Router)();
exports.rentalsRoutes = rentalsRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUseCaseController.ListRentalsByUserController();
rentalsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get("/", _ensureAuthenticated.ensureAuthenticated, listRentalsByUserController.handle);