import { Schema, model } from 'mongoose';
import { ITask } from '../types/task.types';

const taskSchema = new Schema<ITask>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<ITask>('Task', taskSchema);
