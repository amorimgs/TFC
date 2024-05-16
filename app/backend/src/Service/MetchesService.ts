import MatchesModel from '../Model/MatchesModel';

export default class TeamsService {
  private model = new MatchesModel();

  async getAllMatches(inProgress = 'zero') {
    const result = await this.model.getAllMetches();
    if (inProgress === 'true') {
      const inProgressMatches = result.filter((match) => match.inProgress === true);
      return { status: 200, data: inProgressMatches };
    }
    if (inProgress === 'false') {
      const inProgressMatches = result.filter((match) => match.inProgress === false);
      return { status: 200, data: inProgressMatches };
    }
    return { status: 200, data: result };
  }
}
