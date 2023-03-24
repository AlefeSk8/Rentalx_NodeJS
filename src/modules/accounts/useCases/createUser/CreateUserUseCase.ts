import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    name: string;
    password: string;
    email: string;
    driver_license: string;
    avatar?: string;
};

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository
    ) {};

    async execute({ 
        name, 
        password, 
        email, 
        driver_license, 
        avatar
    }: IRequest): Promise<void> {
        const UserAlreadyExists =
            await this.UsersRepository.findByEmail(email)
        ;
    
        if (UserAlreadyExists) {
            throw new AppError("User already exists!", 401);
        };
        
        const passwordHash = await hash(password, 8);

        await this.UsersRepository.create({ 
            name, 
            password: passwordHash, 
            email, 
            driver_license, 
            avatar 
        });
    };
};

export { CreateUserUseCase };