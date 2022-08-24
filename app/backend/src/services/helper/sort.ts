import ITeamData from '../interfaces/team-data.interface';

const sortTeamData = (teamData: ITeamData[]) => {
  const sortedTeamData = teamData.sort((a, b) => b.goalsOwn + a.goalsOwn)
    .sort((a, b) => b.goalsFavor - a.goalsFavor)
    .sort((a, b) => b.goalsBalance - a.goalsBalance)
    .sort((a, b) => b.totalPoints - a.totalPoints);
  return sortedTeamData;
};

export default sortTeamData;
