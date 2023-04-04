import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const createCarController = new CreateCarController();

const carsRoutes = Router();

carsRoutes.post("/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarController.handle
);

export { carsRoutes };