import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import express from 'express';
import { AuthService } from '@/services/auth.service';

export class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const authService = new AuthService();
        try {
            const login = await authService.login(email, password);
            return res.status(login.status).json(login.response);
        } catch (error) {
            next(error);
        }
    }

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const authService = new AuthService();

        try {
            const newAdmin = await authService.createAdmin(email, password);
            return res.status(newAdmin.status).json(newAdmin.response);
        } catch (error) {
            next(error);
        }
    }
}
