import LeaderboardModel from '../Model/LeaderboardModel';

const format = { totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

export default class LeaderboardService {
  private model = new LeaderboardModel();

  private formatMatchLeaderboard = (team: any, homeOrAway: string) => {
    const oposto = homeOrAway === 'home' ? 'away' : 'home';
    const tt = team.reduce((acc: any, match: any) => {
      const victory = match[`${homeOrAway}TeamGoals`] > match[`${oposto}TeamGoals`] ? 1 : 0;
      const draw = match[`${homeOrAway}TeamGoals`] === match[`${oposto}TeamGoals`] ? 1 : 0;
      const lose = match[`${homeOrAway}TeamGoals`] < match[`${oposto}TeamGoals`] ? 1 : 0;
      return {
        totalPoints: acc.totalPoints + victory * 3 + draw,
        totalGames: acc.totalGames + 1,
        totalVictories: acc.totalVictories + victory,
        totalDraws: acc.totalDraws + draw,
        totalLosses: acc.totalLosses + lose,
        goalsFavor: acc.goalsFavor + match[`${homeOrAway}TeamGoals`],
        goalsOwn: acc.goalsOwn + match[`${oposto}TeamGoals`],
      };
    }, format);
    return tt;
  };

  private sortLeaderboard = (a: any, b: any): number => {
    const pointsDifference = b.totalPoints - a.totalPoints;
    if (pointsDifference === 0) {
      const balanceDifference = b.goalsBalance - a.goalsBalance;
      if (balanceDifference === 0) {
        return b.goalsFavor - a.goalsFavor;
      }
      return balanceDifference;
    }
    return pointsDifference;
  };

  async getAllLeaderboard(path: string) {
    const result = await this.model.getAllLeanderboard(path);
    const FR = result.map((team: any) => {
      const tt = this.formatMatchLeaderboard(team[`${path}Matches`], path);
      return {
        name: team.teamName,
        ...tt,
        goalsBalance: tt.goalsFavor - tt.goalsOwn,
        efficiency: (tt.totalPoints / (tt.totalGames * 3)) * 100,
      };
    }).sort(this.sortLeaderboard);
    return { status: 200, data: FR };
  }

  async getAll() {
    const result = await this.model.getAll();
    const FR = result.map((team: any) => {
      const matcheHome = this.formatMatchLeaderboard(team.homeMatches, 'home');
      const matcheAway = this.formatMatchLeaderboard(team.awayMatches, 'away');
      const goalsFavor = matcheHome.goalsFavor + matcheAway.goalsFavor;
      const goalsOwn = matcheHome.goalsOwn + matcheAway.goalsOwn;
      const totalPoints = matcheHome.totalPoints + matcheAway.totalPoints;
      const totalGames = matcheHome.totalGames + matcheAway.totalGames;
      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories: matcheHome.totalVictories + matcheAway.totalVictories,
        totalDraws: matcheHome.totalDraws + matcheAway.totalDraws,
        totalLosses: matcheHome.totalLosses + matcheAway.totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
        efficiency: (totalPoints / (totalGames * 3)) * 100,
      };
    }).sort(this.sortLeaderboard);
    return { status: 200, data: FR };
  }
}
