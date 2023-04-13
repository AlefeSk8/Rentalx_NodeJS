import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
})

export function createConnection(host = "database_ignite"): Promise<DataSource> {
  return AppDataSource.setOptions({ 
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database: process.env.NODE_ENV === "test" ? "rentx_test" : AppDataSource.options.database as string,
  }).initialize();
}

export default AppDataSource;