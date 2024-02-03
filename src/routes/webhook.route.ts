import { Router } from 'express';
import { webhook } from '../controllers/webhook.controller';

export default (router: Router) => {
    router.post('/webhook', webhook);
};
