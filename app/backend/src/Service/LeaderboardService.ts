import LeaderboardModel from '../Model/LeaderboardModel';

export type Matches = {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean,
};

export type FormatType = {
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
};

type MatcheResult = {
  victory: number;
  draw: number;
  lose: number;
  goalsFavor: number;
  goalsOwn: number;
};

type TeamData = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

const initialFormat: FormatType = {
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

const calculateMatchResult = (
  match: Matches,
  homeOrAway: 'home' | 'away',
  oposto: 'home' | 'away',
) => {
  const homeGoals = match[`${homeOrAway}TeamGoals` as keyof Matches] as number;
  const awayGoals = match[`${oposto}TeamGoals` as keyof Matches] as number;
  return {
    victory: homeGoals > awayGoals ? 1 : 0,
    draw: homeGoals === awayGoals ? 1 : 0,
    lose: homeGoals < awayGoals ? 1 : 0,
    goalsFavor: homeGoals,
    goalsOwn: awayGoals,
  };
};

const updateAccumulator = (acc: FormatType, matchResult: MatcheResult): FormatType => ({
  totalPoints: acc.totalPoints + matchResult.victory * 3 + matchResult.draw,
  totalGames: acc.totalGames + 1,
  totalVictories: acc.totalVictories + matchResult.victory,
  totalDraws: acc.totalDraws + matchResult.draw,
  totalLosses: acc.totalLosses + matchResult.lose,
  goalsFavor: acc.goalsFavor + matchResult.goalsFavor,
  goalsOwn: acc.goalsOwn + matchResult.goalsOwn,
});

const formatMatchLeaderboard = (team: Matches[], homeOrAway: 'home' | 'away'): FormatType => {
  const oposto = homeOrAway === 'home' ? 'away' : 'home';
  return team.reduce((acc: FormatType, match: Matches) => {
    const matchResult = calculateMatchResult(match, homeOrAway, oposto);
    return updateAccumulator(acc, matchResult);
  }, initialFormat);
};

const sortLeaderboard = (a: TeamData, b: TeamData): number => {
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

const formatTeamData = (team: any) => {
  const matcheHome = formatMatchLeaderboard(team.homeMatches, 'home');
  const matcheAway = formatMatchLeaderboard(team.awayMatches, 'away');
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
};

export default class LeaderboardService {
  private model = new LeaderboardModel();

  async getAllLeaderboard(path: string) {
    const result = await this.model.getAllLeanderboard(path);
    const formattedResult = result.map((team: any) => {
      const matchResult = formatMatchLeaderboard(team[`${path}Matches`], path as 'home' | 'away');
      return {
        name: team.teamName,
        ...matchResult,
        goalsBalance: matchResult.goalsFavor - matchResult.goalsOwn,
        efficiency: (matchResult.totalPoints / (matchResult.totalGames * 3)) * 100,
      };
    }).sort(sortLeaderboard);
    return { status: 200, data: formattedResult };
  }

  async getAll() {
    const result = await this.model.getAll();
    const formattedResult = result.map(formatTeamData).sort(sortLeaderboard);
    return { status: 200, data: formattedResult };
  }
}
