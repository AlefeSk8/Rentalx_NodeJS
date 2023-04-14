import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send forgot mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            name: "jest", 
            password: "test", 
            email: "test@example.com", 
            driver_license: "465131", 
            avatar: "46a4d",
        });

        await sendForgotPasswordMailUseCase.execute("test@example.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send forgot mail if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("inexistent@email.com")
        ).rejects.toEqual(new AppError("User does not exists!", 401));
    });

    it("Should be able to create an user token", async () => {
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            name: "testUser", 
            password: "123456", 
            email: "test@test.com", 
            driver_license: "465142", 
            avatar: "46a4d",
        });

        await sendForgotPasswordMailUseCase.execute("test@test.com")
        
        expect(generateTokenMail).toBeCalled();
    });
});