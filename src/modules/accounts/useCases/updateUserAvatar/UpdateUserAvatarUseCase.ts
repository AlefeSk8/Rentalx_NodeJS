import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private UsersRepository: IUsersRepository,

        @inject("StorageProvider")
        private StorageProvider: IStorageProvider
    ) {};

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.UsersRepository.findById(user_id);

        if (user.avatar) {
            await this.StorageProvider.delete(user.avatar, "avatar");
        };

        await this.StorageProvider.save(avatar_file, "avatar");

        user.avatar = avatar_file;

        await this.UsersRepository.create(user);
    };
};

export { UpdateUserAvatarUseCase };