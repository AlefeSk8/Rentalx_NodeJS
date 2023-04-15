"use strict";

var _AppError = require("@shared/errors/AppError");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
let usersRepositoryInMemory;
let authenticateUserUseCase;
let createUserUseCase;
let dayjsDateProvider;
let usersTokensRepository;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepository = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepository, dayjsDateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const user = {
      name: "Test",
      password: "1234",
      email: "test@test.com",
      driver_license: "5055603",
      avatar: "URL"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("Should not be able to authenticate an inexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "inexistent_user@example.com",
        password: "inexistent"
      });
    }).rejects.toEqual(new _AppError.AppError("Email or password incorrect!", 401));
  });
  it("Should not be able to authenticate an user with incorrect email", async () => {
    const user = {
      name: "Test",
      password: "1234",
      email: "test@test.com",
      driver_license: "5055603",
      avatar: "URL"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: "incorrectemail@test.com",
      password: user.password
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!", 401));
  });
  it("Should not be able to authenticate an user with incorrect password", async () => {
    const user = {
      name: "Test",
      password: "5616",
      email: "test@test.com",
      driver_license: "5055603",
      avatar: "URL"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrect password"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!", 401));
  });
});