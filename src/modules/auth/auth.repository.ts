// O repository é a camada que fala diretamente com o banco de dados. Sem fazer a conectividade com o banco
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dataBase } from "../../database/connection";
import { User } from "../../utils/User";
import { ulid } from "ulid";


export class authDataBase {
    private id = ulid();

    protected async createNewUser(user: User): Promise<ResultSetHeader> {
        try {
            const dbCode: string = "INSERT INTO Users (idUser, nameUser, emailUser, passwordUser, role) VALUES (?, ?, ?, ?, ?)"
            const value: Array<string | number> = [this.id, user.name, user.email, user.password, user.role ];

            const [rows] = await dataBase.execute<ResultSetHeader>(dbCode, value);
            return rows;
        } catch (err) {
            throw new Error(`Error in create user: ${err}`);
        }
    }
}
