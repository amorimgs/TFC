import SequelizeTeams from '../database/models/teams.model';
import { Teams } from '../types/AllTypes';

export default class TeamsModel {
  private model = SequelizeTeams;

  async getAllTeams(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }

  async getTeamById(id: number): Promise<Teams | null> {
    const result = await this.model.findByPk(id);
    if (!result) {
      return null;
    }
    return result;
  }
}
