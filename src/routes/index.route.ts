import { Router } from 'express';
import taskRoute from './task.route';
import webhookRoute from './webhook.route';

const router = Router();

taskRoute(router);
webhookRoute(router);

export default router;
