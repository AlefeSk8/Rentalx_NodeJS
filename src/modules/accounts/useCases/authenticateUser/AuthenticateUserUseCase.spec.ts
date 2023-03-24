import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate an user with incorrect email", () => {
        expect( async () => {
            const user: ICreateUserDTO = {
                name: "Test",
                password: "1234",
                email: "test@test.com",
                driver_license: "5055603",
                avatar: "URL"
            };
            await createUserUseCase.execute(user);
        
            await authenticateUserUseCase.execute({
                email: "incorrectemail@test.com",
                password: user.password
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});