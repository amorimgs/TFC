import { Request, Response } from 'express';
import MatchesService from '../Service/MetchesService';

export default class TeamsController {
  private service = new MatchesService();

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const result = await this.service.getAllMatches(inProgress);
      return res.status(result.status).json(result.data);
    }
    const result = await this.service.getAllMatches();
    res.status(result.status).json(result.data);
  }
}
