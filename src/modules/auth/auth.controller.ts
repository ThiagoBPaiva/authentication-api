import { Request, Response } from "express";
import { AuthService } from "./auth.service"
import { AuthDataBase } from "./auth.repository"

export class AuthController {
    private authServide = new AuthService(new AuthDataBase());
    // POST /auth/register
    public async authRegister(req: Request, res: Response): Promise<void> {
        const result = await this.authServide.registerUser(req.body);

        if (!result.success) {
            res.status(400).json({ message: result.error });
        } else {
            res.status(200).json({ message: result.data});
        }

        // res.status(result).json(result.message);
    }
}
