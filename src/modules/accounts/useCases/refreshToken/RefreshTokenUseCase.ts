import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    email: string;
};

interface ITokenResponse {
    token: string;
    refresh_token: string;
};

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {};

    async execute(token: string): Promise<ITokenResponse> {
        const { 
            secret_refresh_token, 
            expires_in_refresh_token, 
            expires_refresh_token_days,
            secret_token,
            expires_in_token 
        } = auth;
        const { sub: user_id, email } = verify(token, secret_refresh_token) as IPayload;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userToken) {
            throw new AppError("Refresh token does not exists!", 401)
        };

        await this.usersTokensRepository.deleteById(userToken.id);

        const expires_date = this.dateProvider.addDays(expires_refresh_token_days)

        const refresh_token = sign({email}, secret_refresh_token, {
            subject: user_id,
            expiresIn: expires_in_refresh_token
        });

        await this.usersTokensRepository.create({
            refresh_token,
            user_id,
            expires_date
        });

        const newToken = sign({}, secret_token, {
            subject: user_id,
            expiresIn: expires_in_token
        });

        return {
            refresh_token,
            token: newToken
        };
    };
};

export { RefreshTokenUseCase };