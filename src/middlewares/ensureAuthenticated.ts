import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
    throw new AppError("Token missing!", 401)
    }

    /*
      Bearer hfeabd891ankw65a4618461a

      [0] = Bearer
      [1] = hfeabd891ankw65a4618461a
    */
    const [, token] = authHeader.split(" ") ;

    try {
        const { sub: user_id } = verify(token, "99f4e469458494adb749923b8e6dd194") as IPayload;
        
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 401)
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401)
    }
}