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

  async updateInProgressMatch(matchId: number) {
    const matchUpdat = await this.model.update({ inProgress: false }, { where: { id: matchId } });
    return matchUpdat;
  }

  async updateMatches(id:number, homeTeamGoals:number, awayTeamGoals:number) {
    const matchUpdat = await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return matchUpdat;
  }

  async insertMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const result = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return result;
  }
}
