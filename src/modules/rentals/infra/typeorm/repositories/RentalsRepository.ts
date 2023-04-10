import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";
import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm/data-source";


class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    };
    
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOneBy({car_id});
    };
    
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOneBy({user_id});
    };
    
    async create({user_id, car_id, expected_return_date}): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.repository.save(rental);

        return rental;
    };
};

export { RentalsRepository };