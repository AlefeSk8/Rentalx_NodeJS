import dayjs from 'dayjs';

import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CreateRentalUseCase } from "./CreateRentalUseCase";


let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayJsDateProvider: DayjsDateProvider;

describe("Create a rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate()

    beforeEach( async () => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory;
        dayJsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory, 
            dayJsDateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "Create rental test",
            car_id: "2309ab31-a398-4ba1-9eac-c6296654749f",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    });

    it("Should not be able to create a new rental if there is another open to the same user", () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: "Same user",
                car_id: "123",
                expected_return_date: dayAdd24Hours,
            });
            await createRentalUseCase.execute({
                user_id: "Same user",
                car_id: "456",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("Should not be able to create a new rental if there is another open to the same car", () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "Same car",
                expected_return_date: dayAdd24Hours,
            });
            await createRentalUseCase.execute({
                user_id: "456",
                car_id: "Same car",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("Should not be able to create a new rental with invalid return time", () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError)
    });
});