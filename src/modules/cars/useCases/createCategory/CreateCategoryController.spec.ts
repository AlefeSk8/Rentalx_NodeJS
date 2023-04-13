import { DataSource } from "typeorm";
import request from "supertest";
import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm/data-source";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

let connection: DataSource;

describe("Create category controller", () => {
    beforeAll( async () => {
        connection = await createConnection();

        await connection.runMigrations();
        
        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at)
                values('${id}', 'admin', 'admin@rentx.com', '12345678910', '${password}', true, 'now()')
            `
        );
    });

    afterAll( async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            "email": "admin@rentx.com",
            "password": "admin",
        });
        
        const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            "name": "Category Supertest",
            "description": "Category Supertest",
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        });

        const { status } = response;

        expect(status).toBe(201);
    });
    
    it("Should not be able to create a new category wih same name", async () => {
        const responseToken = await request(app).post("/sessions").send({
            "email": "admin@rentx.com",
            "password": "admin",
        });
        
        const { refresh_token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            "name": "Category Supertest",
            "description": "Category Supertest",
        }).set({
            Authorization: `Bearer ${refresh_token}`,
        });

        expect(response.status).toBe(401);
    });
});