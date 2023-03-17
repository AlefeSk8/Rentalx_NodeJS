import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";


interface IUsersRepository {
    create({ name, password, email, driver_license, avatar }: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
};

export { IUsersRepository };