import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    brand?: string;
    name?: string;
    category_id?: string;
};
@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {};

    async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
        return await this.carsRepository.findAvailable(
            brand, 
            name,
            category_id, 
        );
    };
}

export { ListAvailableCarsUseCase }