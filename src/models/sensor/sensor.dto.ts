import { ApiProperty } from "@nestjs/swagger";

export class Sensor {
    @ApiProperty()
    declare id: string;

    @ApiProperty()
    declare name: string;

    @ApiProperty()
    declare type: 'TEMPERATURE' | 'ANALOG';

    @ApiProperty()
    declare nodeId: string;
}