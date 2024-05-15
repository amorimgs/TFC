import { Request, Response } from 'express';
import TeamsService from '../Service/TeamsService';

export default class TeamsController {
  private service = new TeamsService();

  async getAllTeams(req: Request, res: Response) {
    const result = await this.service.getAllTeams();
    res.status(result.status).json(result.data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.service.getTeamById(Number(id));
    res.status(result.status).json(result.data);
  }
}
