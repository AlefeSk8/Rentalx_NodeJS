import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
    beforeEach( async () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("Should not be able to add a new specification to a non-existent car", () => {
        expect(async () => {
            const car_id = "1234"
            const specifications_id = ["4321"]
            
            await createCarSpecificationUseCase.execute({car_id, specifications_id});
        }).rejects.toBeInstanceOf(AppError);
    });
    
    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test Car2",
            description: "Test specification car",
            daily_rate: 400,
            license_plate: "TST-0A00",
            fine_amount: 80,
            brand: "TEST2",
            category_id: "category"
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: "Test",
            description: "Just a test"
        })
        
        const specifications_id = [specification.id];
        
        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id, 
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
})