import TeamsModel from '../Model/TeamsModel';

export default class TeamsService {
  private model = new TeamsModel();

  async getAllTeams() {
    const result = await this.model.getAllTeams();
    return { status: 200, data: result };
  }

  async getTeamById(id: number) {
    const result = await this.model.getTeamById(id);
    if (!result) {
      return { status: 404, data: { message: 'Team not found' } };
    }
    return { status: 200, data: result };
  }
}
