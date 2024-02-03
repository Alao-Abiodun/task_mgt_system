import userModel from '../models/user.model';
import { IUser, IUserQuery } from '../types/user.types';

export const create = async (data: IUser) => {
    return await userModel.create(data);
};

export const findById = async (id: string) => {
    return await userModel.findById(id).select('-__v').lean();
};

export const findOne = async (data: IUserQuery) => {
    return await userModel.findOne(data).select('-__v').lean();
};
