import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey } from "sequelize-typescript";
import { OpcUaDevice } from "../opc-ua-device/opc-ua-device.entity";
import { Reading } from "../reading/reading.entity";

@Table
export class Sensor extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare type: SensorType;

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

export enum SensorType {
    TEMPERATURE = "TEMPERATURE",
    ANALOG = "ANALOG"
}