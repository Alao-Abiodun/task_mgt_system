import { NextFunction, Request, Response } from 'express';
import tryCatch from '../utils/helpers/tryCatch.helper';
import consumeMessage from '../workers/consumer.worker';
import webhookModel from '../models/webhook.model';

/**
 * Notify the users when task is created, updated or deleted
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @returns ISuccessResponse | IErrorResponse
 */
export const webhook = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        // Your webhook logic here
        const url = req.body.url;

        // save the url to webhook database.
        await webhookModel.create({ url });

        console.log('Client subscribed', `URL: ${url}`);

        // subscribe to the queue
        await consumeMessage(process.env.QUEUE_NAME);

        return res.status(200).send('OK');
    }
);
