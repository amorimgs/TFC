import { Request, Response, Router } from 'express';
import UsersController from '../Controller/UsersController';
import validationEmailAndPassord from '../middlewares/validationEmailAndPassword';
import validationToken from '../middlewares/validationToken';

const usersController = new UsersController();
const router = Router();

router.post('/', validationEmailAndPassord, (req: Request, res: Response) => {
  usersController.login(req, res);
});
router.get('/role', validationToken, (req: Request, res: Response) => {
  const payload = res.locals.user;
  return res.status(200).json({ role: payload.role });
});

export default router;
