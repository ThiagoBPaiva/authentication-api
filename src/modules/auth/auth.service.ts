import * as z from "zod"
import { AuthDataBase } from "./auth.repository"
import { User } from "../../utils/User"
import { hash, compare } from "bcrypt";
import { randomInt } from "node:crypto";
import { ROLE } from "../../utils/enums";

const UserJson = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
})

type UserTDO = z.infer<typeof UserJson>

type ServiceRresponse<T> =
    { success: true, data: T }
    | { success: false, error: string }

export class AuthService {
    constructor (private data: AuthDataBase) {}

    public async registerUser(user: UserTDO): Promise<ServiceRresponse<User>> {
        try {
            const validation = UserJson.safeParse(user);
            if (!validation.data) {
                return { success: false, error: "Invaid data" }
            }

            const isEmail = await this.data.getEmail(user.email);
            if (isEmail.length > 0) {
                return { success: false, error: "Email not valid or inexistent" }
            }

            const hashPassword = await hash(String(user.password), randomInt(10, 16)); // Criptografando a senha

            const newUser = new User(user.name, user.email, hashPassword, ROLE.USER);

            await this.data.createUser(newUser);

            return {
                success: true,
                data: newUser
            };
        } catch (err) {
            throw new Error(String(err));
        }
    }
}
