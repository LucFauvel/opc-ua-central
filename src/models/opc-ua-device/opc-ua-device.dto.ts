import { ApiProperty } from "@nestjs/swagger";
import { Sensor } from "../sensor/sensor.dto";

export class OpcUaDevice {
    @ApiProperty()
    declare id: string;

    @ApiProperty()
    declare name: string;

    @ApiProperty()
    declare address: string;

    @ApiProperty({ type: [Sensor] })
    declare sensors: Sensor[]
}