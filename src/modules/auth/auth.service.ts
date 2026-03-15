import * as z from "zod"

const UserJson = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
})

type UserTDO = z.infer<typeof UserJson>

type returnJSON = {
    status: number
    message: z.ZodIssue[] | UserTDO
}

export class AuthService {

    public async validationJSON(json: UserTDO): Promise<returnJSON> {
        const validation = UserJson.safeParse(json);

        if (!validation.success) {
            return {
                status: 400,
                message: validation.error.issues
            }
        }

        return {
            status: 200,
            message: validation.data
        }
    }
}
