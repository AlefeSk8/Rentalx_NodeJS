import { Repository } from "typeorm";
import AppDataSource from "@shared/infra/typeorm/data-source";
import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    };

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description
        });

        await this.repository.save(category)
    };

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();

        return categories;
    };

    async findByName(name: string): Promise<Category> {
        //Select * from categories where name = "name" limit 1
        const category = await this.repository.findOneBy({name});

        return category;
    }   
};

export { CategoriesRepository };