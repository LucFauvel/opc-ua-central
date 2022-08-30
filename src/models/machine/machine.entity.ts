import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { OpcUaController } from "../opc-ua-controller/opc-ua-controller.entity";

@Table
export class Machine extends Model {
    @Column
    declare id: string;

    @Column
    declare name: string;

    @Column
    declare apiKey: string;

    @HasMany(() => OpcUaController)
    declare controllers: OpcUaController[];
}