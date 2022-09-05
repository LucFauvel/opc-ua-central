import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
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

  async insert(reading: Reading): Promise<void> {
    await this.readingsRepository.create({
      id: randomUUID(),
      value: reading.value,
      readAt: reading.readAt,
      sensorId: reading.sensorId
    });
  }
}