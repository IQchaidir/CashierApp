import { compare } from 'bcrypt';
import prisma from '@/prisma';
import { generateJwt } from '@/lib/generateJwt';
import { hashPassword } from '@/lib/hashPassword';
import { resBadRequest, resCreated, resNotFound, resSuccess, resUnauthorized } from '@/utils/responses';

export class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.user.findFirst({
            where: { email, archive: false },
        });

        if (!user) {
            return resNotFound('Invalid email address');
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
            user_name: user.user_name,
            token: token,
        });
    }
}
