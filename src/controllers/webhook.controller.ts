import { NextFunction, Request, Response } from 'express';
import tryCatch from '../utils/helpers/tryCatch.helper';
import consumeMessage from '../consumers';

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
        console.log(
            'Webhook received after subscribing to the quque:',
            req.body
        );

        // subscribe to the queue
        await consumeMessage(process.env.QUEUE_NAME);

        return res.status(200).send('OK');
    }
);

// // services/webhookService.js
// class WebhookService {
//     protected subscribers: any[];

//     constructor() {
//       this.subscribers = [];
//     }

//     subscribe(subscriber) {
//       this.subscribers.push(subscriber);
//     }

//     unsubscribe(subscriber) {
//       this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
//     }

//     notify(eventType, payload) {
//       this.subscribers.forEach(subscriber => {
//         // Make HTTP POST request to subscriber's webhook endpoint
//         // Example: axios.post(subscriber.webhookURL, { eventType, payload });
//       });
//     }
//   }

//   module.exports = new WebhookService();
