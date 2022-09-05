import { ApiProperty } from "@nestjs/swagger";
import { CreateDeviceDto } from "./createdevice.dto";

export class CreateMachineDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    serial: string;

    @ApiProperty({ type: [CreateDeviceDto] })
    devices: CreateDeviceDto[]
}