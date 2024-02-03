import { Router } from 'express';
import { signUp, login } from '../controllers/user.controller';

export default (router: Router) => {
    router.post('/sign', signUp);
    router.post('/login', login);
};
