import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import User_team_Space from './User_team_Space';
import User from './User';


class Team_Space extends Model {
  public id!: number;
  public team_id!: number;
  public space_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Team_Space.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  space_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'team_space',
  timestamps: true,
});

Team_Space.hasMany(User_team_Space, { foreignKey: 'team_space_id' });
Team_Space.belongsToMany(User, { through: User_team_Space, foreignKey: 'team_space_id' });



export default Team_Space;