import { Request, Response } from 'express';
import UsersService from '../Service/UsersService';

export default class UsersController {
  private service = new UsersService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    return res.status(result.status).json(result.data);
  }
}
