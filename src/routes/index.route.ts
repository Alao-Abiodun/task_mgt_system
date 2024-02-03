import { Router } from 'express';
import taskRoute from './task.route';
import webhookRoute from './webhook.route';
import userRoute from './user.route';

const router = Router();

taskRoute(router);
webhookRoute(router);
userRoute(router);

export default router;
