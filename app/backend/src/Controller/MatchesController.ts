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

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.finishMatch(Number(id));
    res.status(result.status).json(result.data);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this.service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(result.status).json(result.data);
  }

  async insertMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const result = await this.service.insertMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(result.status).json(result.data);
  }
}
