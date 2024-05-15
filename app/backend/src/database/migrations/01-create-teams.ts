import { DataTypes, Model, QueryInterface } from "sequelize";
import { Teams } from "../../types/AllTypes";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Teams>>("teams", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      teamName: {
        field: "team_name",
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("teams");
  }
}