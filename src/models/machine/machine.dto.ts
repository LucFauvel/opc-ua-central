import { ApiProperty } from "@nestjs/swagger";

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
}