import SequelizeMetches from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';

export default class MatchesModel {
  private model = SequelizeMetches;

  async getAllMetches() {
    const result = await this.model.findAll({
      include: [{
        model: TeamsModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      }] });
    return result;
  }
}
