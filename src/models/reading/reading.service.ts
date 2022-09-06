import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Op } from "sequelize";
import { Reading } from "./reading.entity";

@Injectable()
export class ReadingsService {
  constructor(
    @Inject('READINGS_REPOSITORY')
    private readingsRepository: typeof Reading
  ) {}

  async findAll(): Promise<Reading[]> {
    return this.readingsRepository.findAll<Reading>();
  }

  async getChartReadings(sensorId: string): Promise<Reading[]> {
    const now = new Date(Date.now());
    return this.readingsRepository.findAll<Reading>({
      where: {
        sensorId,
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(now.getTime() - (30 * 60 * 1000))
        }
      },
      limit: 50,
      order: [['createdAt', 'ASC']]
    });
  }

  async insert(reading: Reading): Promise<Reading> {
    return this.readingsRepository.create({
      id: randomUUID(),
      value: reading.value,
      readAt: reading.readAt,
      sensorId: reading.sensorId
    });
  }
}