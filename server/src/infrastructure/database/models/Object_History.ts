import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

class Object_History extends Model {
    public id!: number;
    public object_id!: number;
    public device_id!: number;
    public history_number!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Object_History.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    object_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    history_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'object_history',
    timestamps: true,
});


export default Object_History;