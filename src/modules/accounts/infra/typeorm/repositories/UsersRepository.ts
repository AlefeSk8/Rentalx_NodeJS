import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm/data-source";

import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";


class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    };

    async create({ name, password, email, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name, 
            password, 
            email, 
            driver_license, 
            id, 
            avatar
        });

        await this.repository.save(user)
    };

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({email});

        return user;
    };
    
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({id});

        return user;
    };
};

export { UsersRepository };