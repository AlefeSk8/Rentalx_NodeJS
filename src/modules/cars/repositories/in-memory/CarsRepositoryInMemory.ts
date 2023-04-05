import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
        });

        this.cars.push(car);
        
        return car;
    };

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate)
    }

    async findAvailable(
        brand?: string, 
        name?: string,
        category_id?: string, 
    ): Promise<Car[]> {
        const cars = this.cars.filter(car => {
            if (
                car.available === true || 
                (brand && car.brand === brand) || 
                (name && car.name === name) ||
                (category_id && car.category_id === category_id)
            ) { return car };
            return null;
            
        })

        return cars
    };

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => car.id === id);
    };
}

export { CarsRepositoryInMemory }