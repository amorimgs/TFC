import { Request, Response } from 'express';
import Leaderboard from '../Service/LeaderboardService';

export default class LeaderboardController {
  private service = new Leaderboard();

  async getAllLeaderboardHome(req: Request, res: Response) {
    const path = req.path.split('/')[1];
    console.log(path);
    const result = await this.service.getAllLeaderboard(path);
    return res.status(result.status).json(result.data);
  }
}
