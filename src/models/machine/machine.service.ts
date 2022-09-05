import { Inject, Injectable } from "@nestjs/common";
import { randomBytes, randomUUID } from "crypto";
import { CreateMachineDto } from "../../dto/createmachine.dto";
import { OpcUaDevice } from "../opc-ua-device/opc-ua-device.entity";
import { Sensor } from "../sensor/sensor.entity";
import { SensorsService } from "../sensor/sensor.service";
import { Machine } from "./machine.entity";

@Injectable()
export class MachinesService {
  constructor(
    @Inject('MACHINES_REPOSITORY')
    private machinesRepository: typeof Machine,
    private readonly sensorsService: SensorsService
  ) {}

  async findAll(): Promise<Machine[]> {
    return this.machinesRepository.findAll<Machine>({
      include: [
        { model: OpcUaDevice, include: [Sensor] }
      ],
    });
  }

  async createFromDto(dto: CreateMachineDto): Promise<Machine> {
    let sensors = [];
    const machine = await this.machinesRepository.create<Machine>({
      id: randomUUID(),
      name: dto.name,
      serial: dto.serial,
      apiKey: randomBytes(16).toString('hex'),
      devices: dto.devices.map((device) => { 
        const modelDevice = new OpcUaDevice();
        modelDevice.id = randomUUID();
        modelDevice.name = device.name;
        modelDevice.address = device.address;
        sensors = device.sensors.map((sensor) => {
          const modelSensor = new Sensor();
          modelSensor.id = randomUUID();
          modelSensor.name = sensor.name;
          modelSensor.type = sensor.type;
          modelSensor.nodeId = sensor.nodeId;
          modelSensor.deviceId = modelDevice.id;
          return modelSensor;
        });
        return modelDevice;
      })
    }, {
      include: [
        { model: OpcUaDevice, include: [Sensor] }
      ],
    });

    await this.sensorsService.insertMany(sensors);

    return machine;
  }

  async findById(id: string): Promise<Machine> {
    return this.machinesRepository.findByPk(id);
  }

  async getMachineFromApiKey(apiKey: string): Promise<Machine> {
    return this.machinesRepository.findOne<Machine>({
      where: { apiKey },
      include: [
        { model: OpcUaDevice, include: [Sensor] }
      ],
    });
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    const machine = await this.getMachineFromApiKey(apiKey);
    return !!machine;
  }

  async delete(machineId: string): Promise<void> {
    await this.machinesRepository.destroy({
      where: { id: machineId }
    });
  }
}