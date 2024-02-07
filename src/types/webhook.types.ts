import { Types } from 'mongoose';

export interface IWebhook {
    _id?: string;
    url: string;
}

export interface IWebhookQuery {
    id?: Types.ObjectId;
    url?: string;
}
