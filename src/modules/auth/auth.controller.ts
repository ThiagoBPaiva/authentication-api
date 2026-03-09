import { Request, Response } from "express";

export class AuthController {
    // POST /auth/register
    public async authRegister(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: "Teste" })
    }
}
