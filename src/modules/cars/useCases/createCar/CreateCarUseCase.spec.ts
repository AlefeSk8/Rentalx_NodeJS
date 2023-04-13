import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Test Car",
            description: "A test car",
            daily_rate: 500,
            license_plate: "TST-0A00",
            fine_amount: 100,
            brand: "TEST",
            category_id: "category"
        });
        
        expect(car).toHaveProperty("id")
    });

    it("Should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Test Car",
            description: "Test exists license plate",
            daily_rate: 500,
            license_plate: "TST-0A00",
            fine_amount: 100,
            brand: "TEST",
            category_id: "category"
        });
        expect( 
            createCarUseCase.execute({
                name: "Test Car2",
                description: "Test exists license plate",
                daily_rate: 400,
                license_plate: "TST-0A00",
                fine_amount: 80,
                brand: "TEST2",
                category_id: "category"
            })
        ).rejects.toEqual(new AppError("Car already exists!", 401));
    });
    
    it("Should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Test Car Available",
            description: "Test exists license plate",
            daily_rate: 500,
            license_plate: "TST-1A11",
            fine_amount: 100,
            brand: "TEST",
            category_id: "category"
        });

        expect(car.available).toBe(true);
    });

});