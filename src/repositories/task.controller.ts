import taskModel from '../models/task.model';
import { ITask, ITaskQuery } from '../types/task.types';

export const create = async (data: ITask) => {
    return await taskModel.create(data);
};

export const findById = async (id: string) => {
    return await taskModel.findById(id).select('-__v').lean();
};

export const findOne = async (data: ITaskQuery) => {
    return await taskModel.findOne(data).select('-__v').lean();
};

export const findAll = async () => {
    return await taskModel.find().select('-__v').lean();
};

export const update = async (id: string, data: ITask) => {
    return await taskModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
    return await taskModel.findByIdAndDelete(id);
};
