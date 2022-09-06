import { ApiProperty } from "@nestjs/swagger";
import { OpcUaDevice } from "../opc-ua-device/opc-ua-device.dto";

export class Machine {
    @ApiProperty()
    declare id: string;

    @ApiProperty()
    declare name: string;

    @ApiProperty()
    declare serial: string;

    @ApiProperty()
    declare apiKey: string;

    @ApiProperty()
    declare status: string;

    @ApiProperty({ type: [OpcUaDevice] })
    declare devices: OpcUaDevice[];
}