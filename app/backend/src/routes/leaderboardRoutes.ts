import { Request, Response, Router } from 'express';
import Leaderbord from '../Controller/LeaderboardController';

const matchesController = new Leaderbord();
const router = Router();

router.get('/home', (req: Request, res: Response) => {
  matchesController.getAllLeaderboardHome(req, res);
});

router.get('/away', (req: Request, res: Response) => {
  matchesController.getAllLeaderboardHome(req, res);
});

export default router;
