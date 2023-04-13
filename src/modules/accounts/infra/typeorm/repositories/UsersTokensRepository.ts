import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";
import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm/data-source";


class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = AppDataSource.getRepository(UserTokens)
    };
    
    async create({ refresh_token, user_id, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            refresh_token,
            user_id,
            expires_date
        });

        await this.repository.save(userToken);

        return userToken;
    };

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOneBy({user_id, refresh_token});
    };

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    };

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOneBy({refresh_token});
    };
};

export { UsersTokensRepository };