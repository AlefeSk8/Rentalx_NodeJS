import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";


interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>
    findOpenRentalByUser(user_id: string): Promise<Rental>
    create(data: ICreateRentalDTO): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findAllByUser(user_id: string): Promise<Rental[]>;
};

export { IRentalsRepository }