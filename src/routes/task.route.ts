import { Router } from 'express';
import {
    addTask,
    deleteTask,
    getSingleTask,
    getTask,
    updateTask,
} from '../controllers/task.controller';
import { addTaskValidator } from '../middlewares/validations/task.validation';
import { userAuth } from '../middlewares/authorizations/user.authorization';

export default (router: Router) => {
    router.post('/', userAuth, addTaskValidator, addTask);
    router.get('/', getTask);
    router.get('/:id', getSingleTask);
    router.put('/:id', userAuth, updateTask);
    router.delete('/:id', userAuth, deleteTask);
};
