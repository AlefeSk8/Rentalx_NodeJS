//DTO = Data Transfer Object
interface ICreateUserDTO {
    name?: string;
    password?: string;
    email?: string;
    driver_license?: string;
    avatar?: string;
};

export { ICreateUserDTO };