import { Column, Table, Model, HasMany, PrimaryKey } from "sequelize-typescript";
import { OpcUaDevice } from "../opc-ua-device/opc-ua-device.entity";

@Table
export class Machine extends Model<Machine> {
    @PrimaryKey
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare serial: string;

    @Column
    declare apiKey: string;

    @HasMany(() => OpcUaDevice)
    declare devices: OpcUaDevice[];
}