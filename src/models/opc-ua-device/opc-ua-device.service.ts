import { Inject, Injectable } from "@nestjs/common";
import { OpcUaDevice } from "./opc-ua-device.entity";

@Injectable()
export class OpcUaDevicesService {
  constructor(
    @Inject('OPC_UA_DEVICES_REPOSITORY')
    private opcUaDevicesRepository: typeof OpcUaDevice
  ) {}

  async findAll(): Promise<OpcUaDevice[]> {
    return this.opcUaDevicesRepository.findAll<OpcUaDevice>();
  }
}