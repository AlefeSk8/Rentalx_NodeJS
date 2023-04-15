"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnection = createConnection;
exports.default = void 0;
require("reflect-metadata");
var _typeorm = require("typeorm");
const AppDataSource = new _typeorm.DataSource({
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
  subscribers: []
});
function createConnection(host = "database_ignite") {
  return AppDataSource.setOptions({
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database: process.env.NODE_ENV === "test" ? "rentx_test" : AppDataSource.options.database
  }).initialize();
}
var _default = AppDataSource;
exports.default = _default;