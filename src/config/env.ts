// Responsável por carregar e validar variáveis de ambiente.
import dotenv from "dotenv";
import process from "process";

dotenv.config();

export const port = process.env.PORT_SERVE || 3000;
