// Conexão com o banco de dados
import mysql from "mysql2/promise";
import { dataBaseConfig } from "../config/env";

export const dataBase = mysql.createPool({
    host: dataBaseConfig.db_host,
    user: dataBaseConfig.db_user,
    password: dataBaseConfig.db_password,
    database: dataBaseConfig.db_name,
    port: Number(dataBaseConfig.db_port)
});

export async function connection(): Promise<void> {
	try {
		const conn = await dataBase.getConnection();
		console.log("✅ Conectando com o banco MySQL");
		conn.release();
	} catch (err) {
		console.error("❌ Erro ao conectar:", err);
	}
}
