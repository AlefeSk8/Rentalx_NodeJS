import { Request, Response } from "express";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";
import { container } from "tsyringe";


class ResetUserPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;
        
        const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase);

        await resetUserPasswordUseCase.execute({
            token: String(token), 
            password,
        })

        return response.send();
    };
};

export { ResetUserPasswordController };