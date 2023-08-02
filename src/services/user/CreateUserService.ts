import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        // Verifica se o campo não está vazio.
        if (!email) {
            throw new Error("Preencha todos os campos!");
        }

        // Verifica se o email já está cadastrado.
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        });

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado!");
        }

        const passwordHash = await hash(password, 8);
        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService };