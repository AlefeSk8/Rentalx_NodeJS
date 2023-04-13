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
        return await this.repository.findOne({
            where: { car_id, end_date: null },
        });
    };
    
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: { user_id, end_date: null },
        });
    };
    
    async create({user_id, car_id, expected_return_date, id, end_date, total}): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date,
            id,
            end_date,
            total
        });

        await this.repository.save(rental);

        return rental;
    };

    async findById(id: string): Promise<Rental> {
        return await this.repository.findOneBy({id});
    };

    async findAllByUser(user_id: string): Promise<Rental[]> {
        return await this.repository.find({
            where: {user_id},
            relations: ["car"]
        });
    };
};

export { RentalsRepository };