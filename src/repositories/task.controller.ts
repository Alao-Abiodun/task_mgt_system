import taskModel from '../models/task.model';
import { ITask, ITaskQuery } from '../types/task.types';

export const create = async (data: ITask) => {
    return await taskModel.create(data);
};

export const findOne = async (id: ITaskQuery) => {
    return await taskModel.findOne(id);
};

export const findAll = async () => {
    return await taskModel.find();
};

export const update = async (id: string, data: ITask) => {
    return await taskModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
    return await taskModel.findByIdAndDelete(id);
};
