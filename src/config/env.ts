// Responsável por carregar e validar variáveis de ambiente.
import dotenv from "dotenv";
import process from "process";

dotenv.config();

export const port = process.env.PORT_SERVE || 3000;

export const dataBaseConfig = {
    db_host:        process.env.DB_HOST,
    db_user:        process.env.DB_USER,
    db_password:    process.env.DB_PASSWORD,
    db_name:        process.env.DB_NAME,
    db_port:        process.env.DB_PORT
}
