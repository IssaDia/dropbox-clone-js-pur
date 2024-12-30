import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';


class Device extends Model {
    public id!: number;
    public user_id!: number;
    public last_signed_in!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Device.init({  
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    last_signed_in: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'devices',
    timestamps: true,
});


export default Device;