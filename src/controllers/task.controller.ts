import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../utils/lib/response';
import { StatusCodes } from 'http-status-codes';
import tryCatch from '../utils/helpers/tryCatch.helper';
import AppError from '../utils/lib/appError';
import * as taskRepository from '../repositories/task.controller';
import produceMessage from '../producers/index';
import dotenv from 'dotenv';
dotenv.config();

export const addTask = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { title, description } = req.body;
        const taskDetails = {
            title,
            description,
        };
        const task = await taskRepository.create(taskDetails);
        // publish message
        await produceMessage(JSON.stringify(task), process.env.QUEUE_NAME);
        return successResponse(
            res,
            'Task created successfully',
            {},
            StatusCodes.CREATED
        );
    }
);

export const getSingleTask = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const task = await taskRepository.findById(id);
        if (!task) {
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }
        return successResponse(res, 'Task retrieved successfully', task);
    }
);

export const getTask = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const tasks = await taskRepository.findAll();
        return successResponse(res, 'Task retrieved successfully', tasks);
    }
);

export const updateTask = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const task = await taskRepository.findById(id);

        if (!task) {
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }

        const { title, description } = req.body;

        const updatedTask = {
            title,
            description,
        };
        await taskRepository.update(id, updatedTask);
        // publish message
        await produceMessage(updatedTask, process.env.QUEUE_NAME);
        return successResponse(res, 'Task updated successfully');
    }
);

export const deleteTask = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const task = await taskRepository.findById(id);
        if (!task) {
            throw new AppError('Task not found', StatusCodes.NOT_FOUND);
        }
        await taskRepository.remove(id);
        // publish message
        await produceMessage({ task }, process.env.QUEUE_NAME);
        return successResponse(res, 'Task deleted successfully');
    }
);
