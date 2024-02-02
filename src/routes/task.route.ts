import { Router } from 'express';
import { addTask } from '../controllers/task.controller';
import { addTaskValidator } from '../middlewares/validations/task.validation';

export default (router: Router) => {
    router.post('/', addTaskValidator, addTask);
};
