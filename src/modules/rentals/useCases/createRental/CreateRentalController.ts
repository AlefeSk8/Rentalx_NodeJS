import { Request, Response } from "express";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { container } from "tsyringe";


class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { expected_return_date, car_id } = request.body;
        const { id } = request.user;

        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        const rental = await createRentalUseCase.execute({
            user_id: id,
            car_id,
            expected_return_date,
        })

        return response.status(201).json(rental);
    }
};

export { CreateRentalController };