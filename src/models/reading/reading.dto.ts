import { ApiProperty } from "@nestjs/swagger";

export class Reading {
    @ApiProperty()
    declare id: string;

    @ApiProperty()
    declare value: number;

    @ApiProperty()
    declare readAt: Date;

    @ApiProperty()
    declare sensorId: string

    @ApiProperty()
    declare createdAt: string
}