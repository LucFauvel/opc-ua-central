import { ApiProperty } from "@nestjs/swagger";
import { CreateSensorDto } from "./createsensor.dto";

export class CreateDeviceDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty({ type: [CreateSensorDto] })
    sensors: CreateSensorDto[]
}