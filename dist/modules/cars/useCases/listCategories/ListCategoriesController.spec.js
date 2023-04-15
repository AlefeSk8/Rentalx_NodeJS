"use strict";

var _dataSource = require("@shared/infra/typeorm/data-source");
var _app = require("@shared/infra/http/app");
var _supertest = _interopRequireDefault(require("supertest"));
var _bcryptjs = require("bcryptjs");
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let connection;
describe("Create category controller", () => {
  beforeAll(async () => {
    connection = await (0, _dataSource.createConnection)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at)
                values('${id}', 'admin', 'admin@rentx.com', '12345678910', '${password}', true, 'now()')
            `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("Should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      "email": "admin@rentx.com",
      "password": "admin"
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      "name": "Supertest",
      "description": "Supertest"
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(201);
  });
  it("Should be able to list all categories", async () => {
    const response = await (0, _supertest.default)(_app.app).get("/categories");
    expect(response.status).toBe(200);
    // expect(response.body.length).toBe(1);
    // expect(response.body[0]).toHaveProperty("id");
    // expect(response.body[0].name).toEqual("Supertest");
  });
});