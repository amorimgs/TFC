import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../Controller/MatchesController';
import validationToken from '../middlewares/validationToken';
import verifyTeams from '../middlewares/verifyTeams';

const matchesController = new MatchesController();
const router = Router();

router.get('/', (req: Request, res: Response) => {
  matchesController.getAllMatches(req, res);
});

router.patch('/:id/finish', validationToken, (req: Request, res: Response) => {
  matchesController.finishMatch(req, res);
});

router.patch('/:id', validationToken, (req: Request, res: Response) => {
  matchesController.updateMatch(req, res);
});

router.post('/', validationToken, (req: Request, res: Response, next: NextFunction) => {
  verifyTeams(req, res, next);
}, (req: Request, res: Response) => {
  matchesController.insertMatch(req, res);
});
export default router;
