import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../utils/lib/response';
import { StatusCodes } from 'http-status-codes';
import tryCatch from '../utils/helpers/tryCatch.helper';
import AppError from '../utils/lib/appError';
import * as userRepository from '../repositories/user.repository';
import { comparePassword, hashPassword } from '../utils/helpers/bcrypt.helper';
import { generateJwtToken } from '../utils/helpers/jwt.helper';
import { removePasswordFromObject } from '../utils/helpers/user.helper';
import consumeMessage from '../workers/consumer.worker';

export const signUp = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password } = req.body;

        const hashedPassword = await hashPassword(password);

        const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
        };

        await userRepository.create(user);

        return successResponse(
            res,
            'User created successfully',
            {},
            StatusCodes.CREATED
        );
    }
);

export const login = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await userRepository.findOne({ email });
        if (!user) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        const isPasswordMatch = await comparePassword(password, user.password);

        if (!isPasswordMatch) {
            throw new AppError(
                'Invalid email or password',
                StatusCodes.UNAUTHORIZED
            );
        }

        const token = generateJwtToken({ email: user.email }, '1h');

        await consumeMessage(process.env.QUEUE_NAME, 'A new task has been created');

        return successResponse(res, 'User logged in successfully', {
            data: { user: removePasswordFromObject(user) },
            token,
        });
    }
);
