import { DataSource } from "typeorm";
import { createConnection } from "@shared/infra/typeorm/data-source";
import { app } from "@shared/infra/http/app";
import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

let connection: DataSource

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
        
        const { token } = responseToken.body;

        await request(app).post("/categories").send({
            "name": "Category Supertest",
            "description": "Category Supertest",
        }).set({
            Authorization: `Bearer ${token}`,
        });

        const response = await request(app).get("/categories");
    
        expect(response.status).toBe(201);
    });

    it("Should be able to list all categories", async () => {
        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");
    });
});