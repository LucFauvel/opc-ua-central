import { Column, Table, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey } from "sequelize-typescript";
import { Machine } from "../machine/machine.entity";
import { Sensor } from "../sensor/sensor.entity";

@Table
export class OpcUaDevice extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare address: string;

    @ForeignKey(() => Machine)
    @Column
    declare machineId: string;

    @BelongsTo(() => Machine)
    declare machine: Machine

    @HasMany(() => Sensor)
    declare sensors: Sensor[]
}