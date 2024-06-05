import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export async function generateJwt(user: User) {
    const jwtToken = sign(
        {
            id: user.id,
            role: user.role,
            email: user.email,
        },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1d' },
    );
    return jwtToken;
}
