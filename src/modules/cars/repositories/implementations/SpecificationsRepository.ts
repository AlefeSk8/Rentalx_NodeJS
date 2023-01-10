import { Repository } from "typeorm";
import AppDataSource from "../../../../database/data-source";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = AppDataSource.getRepository(Specification);
    };
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name, 
            description,
        });

        await this.repository.save(specification);
    };

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOneBy({name});

        return specification;
    };
    
};

export { SpecificationsRepository };