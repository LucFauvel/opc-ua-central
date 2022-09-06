import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Reading } from "../models/reading/reading.dto";
import { ReadingsService } from "../models/reading/reading.service";

@ApiTags('readings')
@Controller('/readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Get('/chart/:id')
  @ApiOkResponse({ type: [Reading] })
  @UseGuards(AuthGuard('jwt'))
  async getChartReadings(@Param('id') sensorId: string): Promise<Reading[]> {
    const readings = await this.readingsService.getChartReadings(sensorId);
    return readings.map((reading) => {
        return {
            id: reading.id,
            value: reading.value,
            readAt: reading.readAt,
            sensorId: reading.sensorId,
            createdAt: reading.createdAt
        }
    })
  }
}