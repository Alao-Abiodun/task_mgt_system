import { NextFunction, Request, Response } from 'express';
import { verifyJwtToken } from '../../utils/helpers/jwt.helper';
import AppError from '../../utils/lib/appError';
import { StatusCodes } from 'http-status-codes';
import tryCatch from '../../utils/helpers/tryCatch.helper';
import userModel from '../../models/user.model';

export const userAuth = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new AppError(
                'Authorization token is missing',
                StatusCodes.FORBIDDEN
            );
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError(
                'Authorization token is missing',
                StatusCodes.FORBIDDEN
            );
        }

        const decodedToken = verifyJwtToken(token);

        if (!decodedToken) {
            throw new AppError(
                'Authorization token is invalid',
                StatusCodes.FORBIDDEN
            );
        }

        // TODO: validate if token exist in db and is not expired
        const user = await userModel.findById(decodedToken.id).lean();
        if (!user) {
            throw new AppError(
                'Patient does not exist',
                StatusCodes.BAD_REQUEST
            );
        }

        req.app.set('user', user);
        next();
    }
);
