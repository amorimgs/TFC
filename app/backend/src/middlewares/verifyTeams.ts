import { Request, Response, NextFunction } from 'express';
import TeamModel from '../Model/TeamsModel';

async function verifyTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  const homeTeam = await new TeamModel().getTeamById(homeTeamId);
  const awayTeam = await new TeamModel().getTeamById(awayTeamId);
  if (!homeTeam || !awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return next();
}

export default verifyTeams;
