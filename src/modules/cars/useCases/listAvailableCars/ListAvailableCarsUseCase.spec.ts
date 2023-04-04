import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
    beforeEach( async () => {
        carsRepositoryInMemory = new CarsRepositoryInMemory;
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    
    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Civic",
            description: "Civic 2020",
            daily_rate: 449.90,
            license_plate: "TST-0A00",
            fine_amount: 100,
            brand: "Honda",
            category_id: "9327e17a-304c-4f1c-978d-da480fcbb590"
        })
        
        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car])
    });
    
    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Filter Test By Name",
            description: "Civic 2019",
            daily_rate: 410.90,
            license_plate: "TST-0A11",
            fine_amount: 89.90,
            brand: "Honda",
            category_id: "9327e17a-304c-4f1c-978d-da480fcbb590"
        })
        
        const cars = await listCarsUseCase.execute({
            name: "Filter Test By Name"
        });

        expect(cars).toEqual([car])
    });
    
    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Civic",
            description: "Civic 2021",
            daily_rate: 470.90,
            license_plate: "TST-0A22",
            fine_amount: 119.90,
            brand: "Honda",
            category_id: "9327e17a-304c-4f1c-978d-da480fcbb590"
        })
        
        const cars = await listCarsUseCase.execute({
            brand: "Honda"
        });

        expect(cars).toEqual([car])
    });
    
    it("Should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Civic",
            description: "Civic 2022",
            daily_rate: 490.90,
            license_plate: "TST-0A33",
            fine_amount: 149.90,
            brand: "Honda",
            category_id: "9327e17a-304c-4f1c-978d-da480fcbb590"
        })
        
        const cars = await listCarsUseCase.execute({
            category_id: "9327e17a-304c-4f1c-978d-da480fcbb590"
        });

        expect(cars).toEqual([car])
    });
})