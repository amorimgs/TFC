import { DataTypes, Model, QueryInterface } from "sequelize";
import { Matches } from "../../types/AllTypes";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Matches>>("matches", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      homeTeamId: {
        field: "home_team_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      homeTeamGoals: {
        field: "home_team_goals",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awayTeamId: {
        field: "away_team_id",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awayTeamGoals: {
        field: "away_team_goals",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inProgress: {
        field: "in_progress",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("matches");
  }
}