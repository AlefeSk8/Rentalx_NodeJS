import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm/data-source";


class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });

        await this.repository.save(car);

        return car;
    };

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOneBy({license_plate});
    };
}

export { CarsRepository };