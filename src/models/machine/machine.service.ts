import { Inject, Injectable } from "@nestjs/common";
import { OpcUaDevice } from "../opc-ua-device/opc-ua-device.entity";
import { Sensor } from "../sensor/sensor.entity";
import { Machine } from "./machine.entity";

@Injectable()
export class MachinesService {
  constructor(
    @Inject('MACHINES_REPOSITORY')
    private machinesRepository: typeof Machine
  ) {}

  async findAll(): Promise<Machine[]> {
    return this.machinesRepository.findAll<Machine>({
      include: [
        { model: OpcUaDevice, include: [Sensor] }
      ],
    });
  }
}