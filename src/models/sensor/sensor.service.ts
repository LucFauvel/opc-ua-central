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

  async insertMany(sensors: Sensor[]): Promise<void> {
    await this.sensorsRepository.bulkCreate<Sensor>(sensors.map((sensor) => {
      return {
        id: sensor.id,
        name: sensor.name,
        type: sensor.type,
        nodeId: sensor.nodeId,
        deviceId: sensor.deviceId
      }
    }));
  }
}