import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey, DataType } from "sequelize-typescript";
import { OpcUaDevice } from "../opc-ua-device/opc-ua-device.entity";
import { Reading } from "../reading/reading.entity";

@Table
export class Sensor extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column(DataType.ENUM('TEMPERATURE', 'ANALOG'))
    declare type: 'TEMPERATURE' | 'ANALOG';

    @Column
    declare nodeId: string;

    @ForeignKey(() => OpcUaDevice)
    @Column
    declare deviceId: string;

    @BelongsTo(() => OpcUaDevice)
    declare opcUaDevice: OpcUaDevice

    @HasMany(() => Reading)
    declare readings: Reading[]
}
