import { ApiProperty } from "@nestjs/swagger";
import { Column, Table, Model, HasMany, PrimaryKey } from "sequelize-typescript";
import { OpcUaDevice } from "../opc-ua-device/opc-ua-device.entity";

@Table
export class Machine extends Model<Machine> {
    @PrimaryKey
    @Column
    @ApiProperty()
    declare id: string;

    @Column
    @ApiProperty()
    declare name: string;

    @Column
    declare apiKey: string;

    @HasMany(() => OpcUaDevice)
    declare devices: OpcUaDevice[];
}