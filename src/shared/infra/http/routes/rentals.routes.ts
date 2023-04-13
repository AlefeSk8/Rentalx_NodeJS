import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUseCaseController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

rentalsRoutes.get("/", ensureAuthenticated, listRentalsByUserController.handle);

export { rentalsRoutes };
