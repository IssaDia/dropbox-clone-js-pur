import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';


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


export default Team_Space;