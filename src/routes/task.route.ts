import { Router } from 'express';
import {
    addTask,
    deleteTask,
    getSingleTask,
    getTask,
    updateTask,
} from '../controllers/task.controller';
import { addTaskValidator } from '../middlewares/validations/task.validation';

export default (router: Router) => {
    router.post('/', addTaskValidator, addTask);
    router.get('/', getTask);
    router.get('/:id', getSingleTask);
    router.put('/:id', updateTask);
    router.delete('/:id', deleteTask);
};
