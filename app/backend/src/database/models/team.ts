import { DataTypes, Model } from 'sequelize';
import db from '.';
// import Match from './match';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  tableName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
// Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

// Team.hasMany(Match, { foreignKey: 'id', as: 'matches' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
