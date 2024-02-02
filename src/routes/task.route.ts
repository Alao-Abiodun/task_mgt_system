import { Router } from 'express';
import {
    addTask,
    getSingleTask,
    getTask,
} from '../controllers/task.controller';
import { addTaskValidator } from '../middlewares/validations/task.validation';

export default (router: Router) => {
    router.post('/', addTaskValidator, addTask);
    router.get('/', getTask);
    router.get('/:id', getSingleTask);
};
