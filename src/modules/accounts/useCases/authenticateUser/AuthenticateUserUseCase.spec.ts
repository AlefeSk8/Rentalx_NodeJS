import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepository: UsersTokensRepositoryInMemory;

describe("Authenticate User", () => {
    
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        dayjsDateProvider =new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory, 
            usersTokensRepository, 
            dayjsDateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    
    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
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
        expect( async () => {
            await authenticateUserUseCase.execute({
                email: "inexistent_user@example.com",
                password: "inexistent"
            });
        }).rejects.toEqual(new AppError("Email or password incorrect!", 401));
    });

    it("Should not be able to authenticate an user with incorrect email", async () => {
        const user: ICreateUserDTO = {
            name: "Test",
            password: "1234",
            email: "test@test.com",
            driver_license: "5055603",
            avatar: "URL"
        };
        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: "incorrectemail@test.com",
                password: user.password,
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!", 401));
    });

    it("Should not be able to authenticate an user with incorrect password", async () => {
        const user: ICreateUserDTO = {
            name: "Test",
            password: "5616",
            email: "test@test.com",
            driver_license: "5055603",
            avatar: "URL"
        };
        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect password",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!", 401));
    });
});