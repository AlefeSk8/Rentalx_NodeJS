"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
var _MailProviderInMemory = require("@shared/container/providers/MailProvider/inMemory/MailProviderInMemory");
var _AppError = require("@shared/errors/AppError");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send forgot mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      name: "jest",
      password: "test",
      email: "test@example.com",
      driver_license: "465131",
      avatar: "46a4d"
    });
    await sendForgotPasswordMailUseCase.execute("test@example.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send forgot mail if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("inexistent@email.com")).rejects.toEqual(new _AppError.AppError("User does not exists!", 401));
  });
  it("Should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      name: "testUser",
      password: "123456",
      email: "test@test.com",
      driver_license: "465142",
      avatar: "46a4d"
    });
    await sendForgotPasswordMailUseCase.execute("test@test.com");
    expect(generateTokenMail).toBeCalled();
  });
});