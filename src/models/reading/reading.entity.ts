import { Column, Table, Model, ForeignKey, BelongsTo, PrimaryKey } from "sequelize-typescript";
import { Sensor } from "../sensor/sensor.entity";

@Table
export class Reading extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare value: number;

    @Column
    declare readAt: Date;

    @ForeignKey(() => Sensor)
    @Column
    declare sensorId: string

    @BelongsTo(() => Sensor)
    declare sensor: Sensor
}