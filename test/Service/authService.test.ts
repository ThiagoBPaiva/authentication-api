// testando a regra de negocios dos Autenticados
import { AuthService } from "../../src/modules/auth/auth.service"
import { AuthDataBase } from "../../src/modules/auth/auth.repository"
import { RowDataPacket } from "mysql2";
import { InputDTO } from "../../src/utils/types"

const db = new AuthDataBase();
const authService = new AuthService(db);

const input: InputDTO = {
    name: "Thiago",
    email: "thiago@gmail.com",
    password: "123456"
};

describe("Register User", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("Recebendo JSON valido.", async () => {
        jest.spyOn(db, "createUser").mockResolvedValue({} as any);
        jest.spyOn(db, "getEmail").mockResolvedValue([]);

        const result = await authService.registerUser(input);

        expect(result).toEqual({
            success: true,
            data: expect.objectContaining({
                name: "Thiago",
                email: "thiago@gmail.com"
            })
        })
    })

    it("Validar se o Email existe.", async () => {
        jest.spyOn(db, "getEmail").mockResolvedValue([{} as RowDataPacket]);
        const result = await authService.registerUser(input);

        expect(result).toEqual({
            success: false,
            error: "Email existing"
        })

        expect(db.createUser).not.toHaveBeenCalled();
    })

    it("Recebendo JSON invalido I.", async () => {
        const input: InputDTO = {
            name: "Thiago",
            email: "thiago@gmail.com",
            password: "12345"
        };

        // Mock de criar um usuario no banco: Isso ajuda muito Meu Deus
        jest.spyOn(db, "createUser").mockResolvedValue({} as any);
        // Mock de buscar o email no banco
        jest.spyOn(db, "getEmail").mockResolvedValue([]);

        const result = await authService.registerUser(input);

        expect(result).toEqual({
            success: false,
            error: "Invalid data"
        })

        expect(db.createUser).not.toHaveBeenCalled();
    })

    it("Recebendo JSON invalido II.", async () => {
        const input: InputDTO = {
            name: "Thiago",
            email: "thiago@gmailcom",
            password: "123456"
        };

        // Mock de criar um usuario no banco: Isso ajuda muito Meu Deus
        jest.spyOn(db, "createUser").mockResolvedValue({} as any);
        // Mock de buscar o email no banco
        jest.spyOn(db, "getEmail").mockResolvedValue([]);

        const result = await authService.registerUser(input);

        expect(result).toEqual({
            success: false,
            error: "Invalid data"
        })

        expect(db.createUser).not.toHaveBeenCalled();
    })

    it("Recebendo JSON invalido III.", async () => {
        const input: InputDTO = {
            name: "",
            email: "thiago@gmail.com",
            password: "123456"
        };

        // Mock de criar um usuario no banco: Isso ajuda muito Meu Deus
        jest.spyOn(db, "createUser").mockResolvedValue({} as any);
        // Mock de buscar o email no banco
        jest.spyOn(db, "getEmail").mockResolvedValue([]);

        const result = await authService.registerUser(input);

        expect(result).toEqual({
            success: false,
            error: "Invalid data"
        })

        expect(db.createUser).not.toHaveBeenCalled();
    })
})
