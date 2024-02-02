import { Router } from 'express';
import { addTask } from '../controllers/task.controller';

export default (router: Router) => {
    router.post('/', addTask);
};
