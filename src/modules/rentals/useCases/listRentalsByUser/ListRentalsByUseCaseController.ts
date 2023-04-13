import { Request, Response } from "express";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";
import { container } from "tsyringe";


class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);
        
        const rentalsOfUser = await listRentalsByUserUseCase.execute(id);

        return response.json(rentalsOfUser);
    };
};

export { ListRentalsByUserController };