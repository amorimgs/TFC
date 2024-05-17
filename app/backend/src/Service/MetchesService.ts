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

  async finishMatch(matchId: number) {
    const result = await this.model.updateInProgressMatch(matchId);
    if (result[0] === 0) {
      return { status: 404, data: { message: 'Match not found' } };
    }
    return { status: 200, data: { message: 'Finished' } };
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const result = await this.model.updateMatches(id, homeTeamGoals, awayTeamGoals);
    if (result[0] === 0) {
      return { status: 404, data: { message: 'Match not found' } };
    }
    return { status: 200, data: { message: 'Updated' } };
  }

  async insertMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const result = await this.model.insertMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return { status: 201, data: result };
  }
}
