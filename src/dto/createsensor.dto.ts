import { ApiProperty } from "@nestjs/swagger";

export class CreateSensorDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ enum: ["TEMPERATURE", "ANALOG"] })
    type: 'TEMPERATURE' | 'ANALOG';

    @ApiProperty()
    nodeId: string;
}
