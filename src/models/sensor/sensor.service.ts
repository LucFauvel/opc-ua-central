import { Inject, Injectable } from "@nestjs/common";
import { Sensor } from "./sensor.entity";

@Injectable()
export class SensorsService {
  constructor(
    @Inject('SENSORS_REPOSITORY')
    private sensorsRepository: typeof Sensor
  ) {}

  async findAll(): Promise<Sensor[]> {
    return this.sensorsRepository.findAll<Sensor>();
  }
}