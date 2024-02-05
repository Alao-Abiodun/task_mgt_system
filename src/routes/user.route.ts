import { Router } from 'express';
import { signUp, login } from '../controllers/user.controller';

export default (router: Router) => {
    router.post('/user/signup', signUp);
    router.post('/user/login', login);
};
