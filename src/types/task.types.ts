import { Types } from 'mongoose';

export interface ITask {
    _id?: string;
    title: string;
    description?: string;
}
