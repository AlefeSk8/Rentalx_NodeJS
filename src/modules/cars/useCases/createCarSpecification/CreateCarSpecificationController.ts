import { Request, Response } from "express";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { container } from "tsyringe";


class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const cars = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id
        });
        
        return response.json(cars);
    }
};

export { CreateCarSpecificationController }