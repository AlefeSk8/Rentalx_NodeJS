import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";

import { router } from './routes';

import "../../container";

import { createConnection } from "../typeorm/data-source";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    };

    return response.status(500).json({ 
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});

export { app };