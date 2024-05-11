import { compare } from 'bcrypt';
import prisma from '@/prisma';
import { generateJwt } from '@/utils/generateJwt';
import { hashPassword } from '@/utils/hashPassword';
import { resBadRequest, resCreated, resNotFound, resSuccess, resUnauthorized } from '@/utils/responses';

export class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            return resNotFound('User not found');
        }

        const hashPassword = user.password;

        const token = await generateJwt(user);

        const isValidPassword = await compare(password, hashPassword);
        if (!isValidPassword) {
            return resUnauthorized('Invalid password');
        }

        return resSuccess({
            id: user.id,
            email: user.email,
            role: user.role,
            token: token,
        });
    }

    async createAdmin(email: string, password: string) {
        const existingEmail = await prisma.user.findUnique({
            where: { email },
        });
        if (existingEmail) {
            return resBadRequest('Email already use');
        }
        const hashed = await hashPassword(password);
        const newAdmin = await prisma.user.create({
            data: { email, password: hashed, role: 'ADMIN' },
        });
        return resCreated(newAdmin);
    }
}
