import { Types } from 'mongoose';

export interface ITask {
    _id?: string;
    title: string;
    description?: string;
}

export interface ITaskQuery {
    id?: Types.ObjectId;
    title?: string;
    description?: string;
    limit?: number;
    skip?: number;
}
