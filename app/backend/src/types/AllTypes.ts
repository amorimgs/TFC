export type Teams = {
  id: number,
  teamName: string,
};

export type Users = {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
};

export type Matches = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
};
