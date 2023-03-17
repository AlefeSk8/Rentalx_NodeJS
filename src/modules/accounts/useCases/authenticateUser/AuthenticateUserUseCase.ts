import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
};

interface IResponse {
    user: {
        name: string,
        email: string,
    },
    token: string,
};

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {};

    async execute({ email, password }: IRequest): Promise<IResponse> {
        //Usuario existe?
        const user = await this.usersRepository.findByEmail(email);
        
        if (!user) {
            throw new AppError("Email or password incorrect!", 401);
        };

        //Senha está correta?
        const passwordMatch = compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!", 401);
        };

        //Gerar jsonwebtoken!
        const token = sign({}, "99f4e469458494adb749923b8e6dd194", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn;
    };
}

export { AuthenticateUserUseCase }