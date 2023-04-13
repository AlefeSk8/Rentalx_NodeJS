import dayjs from 'dayjs';

import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';


let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase;
let dayJsDateProvider: DayjsDateProvider;

describe("Create a rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate()

    beforeEach( async () => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory;
        dayJsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory;
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider,
            carsRepositoryInMemory,
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Just a test",
            daily_rate: 100,
            license_plate: "TST-1A34",
            fine_amount: 20, 
            brand: "Test",
            category_id: "1234",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "Create rental test",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "Same user",
            car_id: "6416",
            expected_return_date: dayAdd24Hours
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "Same user",
                car_id: "4553",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Already have a rental in progress for this user!", 401))
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "1686",
            car_id: "Same car",
            expected_return_date: dayAdd24Hours
        });

        expect(
            createRentalUseCase.execute({
                user_id: "45618",
                car_id: "Same car",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable", 401))
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "1234",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time!", 401))
    });
});