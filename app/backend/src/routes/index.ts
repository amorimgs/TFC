import { Router } from 'express';
import teamsRouter from './teamsRoutes';
import usersRouter from './usersRoutes';
import matchesRouter from './matchesRoutes';
import leaderboardRouter from './leaderboardRoutes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
