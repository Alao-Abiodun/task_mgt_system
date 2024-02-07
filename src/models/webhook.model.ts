import { Schema, model } from 'mongoose';
import { IWebhook } from '../types/webhook.types';

const webhookSchema = new Schema<IWebhook>(
    {
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<IWebhook>('Webhook', webhookSchema);
