import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import usersRouter from './usersRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);

export default router;
