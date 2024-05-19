// import SequelizeMetches from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';

export default class LeaderboardModel {
  private model = TeamsModel;

  async getAllLeanderboard(path:string) {
    const result = await this.model.findAll({
      include: [{
        model: MatchesModel,
        where: { inProgress: false },
        as: `${path}Matches`,
        attributes: { exclude: ['id', 'inProgess'] },
      },
      ],
      attributes: { exclude: ['id'] },
    });
    return result;
  }

  async getAll() {
    const result = await this.model.findAll({
      include: [{
        model: MatchesModel,
        where: { inProgress: false },
        as: 'homeMatches',
        attributes: { exclude: ['id', 'inProgess'] },
      }, {
        model: MatchesModel,
        where: { inProgress: false },
        as: 'awayMatches',
        attributes: { exclude: ['id', 'inProgess'],
        } }],
      attributes: { exclude: ['id'] },
    });
    return result;
  }
}
