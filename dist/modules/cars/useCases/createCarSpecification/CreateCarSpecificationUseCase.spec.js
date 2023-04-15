"use strict";

var _AppError = require("@shared/errors/AppError");
var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");
var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var _SpecificationsRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
let createCarSpecificationUseCase;
describe("Create car specification", () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("Should not be able to add a new specification to a non-existent car", () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["4321"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      });
    }).rejects.toEqual(new _AppError.AppError("Car does't exists!", 401));
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
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});