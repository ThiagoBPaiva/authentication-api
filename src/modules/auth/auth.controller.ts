import { Request, Response } from "express";
import { AuthService } from "./auth.service"

export class AuthController {
    private authServide = new AuthService();
    // POST /auth/register
    public async authRegister(req: Request, res: Response): Promise<void> {
        const {name, email, password} = req.body;

        const result = await this.authServide.validationJSON({name: name, email: email, password: password})

        res.status(result.status).json(result.message);
    }
}
