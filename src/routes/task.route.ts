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
    router.post('/task', addTaskValidator, addTask);
    router.get('/task', getTask);
    router.get('/task/:id', getSingleTask);
    router.put('/task/:id', userAuth, updateTask);
    router.delete('/task/:id', userAuth, deleteTask);
};
