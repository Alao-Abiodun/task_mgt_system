import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../utils/lib/response';
import { StatusCodes } from 'http-status-codes';
import tryCatch from '../utils/helpers/tryCatch.helper';
import AppError from '../utils/lib/appError';
import * as taskRepository from '../repositories/task.controller';

export const addTask = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { title, description } = req.body;
        const task = {
            title,
            description,
        };
        await taskRepository.create(task);
        return successResponse(
            res,
            'Task created successfully',
            {},
            StatusCodes.CREATED
        );
    }
);
