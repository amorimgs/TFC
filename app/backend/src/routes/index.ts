import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import usersRouter from './usersRoutes';
import matchesRouter from './matchesRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);

export default router;
