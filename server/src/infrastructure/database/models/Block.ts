import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeInstance';
import Object_History from './Object_History';


class Block extends Model {
  public id!: number;
  public object_history_id!: number;
  public block_position!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Block.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  object_history_id: {
    type: DataTypes.UUID,
    allowNull: false,
    
  },
  block_position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'blocks',
  timestamps: true,
});


export default Block;