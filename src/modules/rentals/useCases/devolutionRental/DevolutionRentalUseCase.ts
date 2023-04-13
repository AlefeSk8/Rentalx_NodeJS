import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string,
    user_id: string,
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DayjsDateProvider")
        private dayjsDateProvider: DayjsDateProvider,
    ) {}

    async execute({id, user_id}: IRequest) {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id)
        const minimum_daily = 1;

        if(!rental) {
            throw new AppError("Rental does not exists!");
        };

        const dateNow = this.dayjsDateProvider.dateNow();

        let daily = this.dayjsDateProvider.compareInDays(
            rental.start_date,
            this.dayjsDateProvider.dateNow(),
        );

        if(daily <= 0) {
            daily = minimum_daily;
        };

        const delay = this.dayjsDateProvider.compareInDays(
            rental.expected_return_date,
            dateNow,
        );
        console.log(delay);

        let total = 0;

        if(delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        };

        total += daily * car.daily_rate;

        rental.end_date = this.dayjsDateProvider.dateNow()
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(rental.car_id, true);

        return rental;
    }
};

export { DevolutionRentalUseCase };