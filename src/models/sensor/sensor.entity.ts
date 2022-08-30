import { Column, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { OpcUaController } from "../opc-ua-controller/opc-ua-controller.entity";
import { Reading } from "../reading/reading.entity";

@Table
export class Sensor extends Model {
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare type: SensorType;

    @Column
    declare nodeId: string;

    @ForeignKey(() => OpcUaController)
    @Column
    declare controllerId: string;

    @BelongsTo(() => OpcUaController)
    declare opcUaController: OpcUaController

    @HasMany(() => Reading)
    declare readings: Reading[]
}

export enum SensorType {
    TEMPERATURE = "TEMPERATURE",
    ANALOG = "ANALOG"
}