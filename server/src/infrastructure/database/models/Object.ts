import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';


class Object extends Model {
  public id!: number;
  public name!: string;
  public latest_history_number!: number;
  public team_space_id!: number;
  public readonly last_edited!: Date;
  public readonly updatedAt!: Date;
}

Object.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        latest_history_number: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        team_space_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'objects',
        timestamps: true,
    }
)

export default Object;