// O repository é a camada que fala diretamente com o banco de dados. Sem fazer a conectividade com o banco
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dataBase } from "../../database/connection";
import { User } from "../../utils/User";
import { ulid } from "ulid";


export class AuthDataBase {
    private id = ulid();

    private async createUserMethode(user: User): Promise<ResultSetHeader> {
        try {
            const dbCode: string = "INSERT INTO User (idUser, nameUser, userEmail, userPassword, role) VALUES (?, ?, ?, ?, ?)"
            const value: Array<string | number> = [this.id, user.name, user.email, user.password, user.role ];

            const [rows] = await dataBase.execute<ResultSetHeader>(dbCode, value);
            return rows;
        } catch (err) {
            throw new Error(`Error in create user: ${err}`);
        }
    }

    private async getEmailMethode(email: string): Promise<RowDataPacket[]> {
        try {
            const dbCode: string = "SELECT * FROM User WHERE userEmail = ?";

            const [rows] = await dataBase.execute<RowDataPacket[]>(dbCode, [email]);
            return rows;
        } catch (err) {
            throw new Error(`Error in get Email: ${err}`);
        }
    }

    public async createUser(user: User): Promise<ResultSetHeader> {
        return await this.createUserMethode(user);
    }

    public async getEmail(email: string): Promise<RowDataPacket[]> {
        return await this.getEmailMethode(email);
    }
}
