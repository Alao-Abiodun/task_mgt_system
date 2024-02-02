import { Router } from 'express';
import taskRoute from './task.route';

const router = Router();

taskRoute(router);

export default router;
