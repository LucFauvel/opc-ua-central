import { Inject, Injectable } from "@nestjs/common";
import { OpcUaController } from "./opc-ua-controller.entity";

@Injectable()
export class OpcUaControllersService {
  constructor(
    @Inject('OPC_UA_CONTROLLERS_REPOSITORY')
    private opcUaControllersRepository: typeof OpcUaController
  ) {}

  async findAll(): Promise<OpcUaController[]> {
    return this.opcUaControllersRepository.findAll<OpcUaController>();
  }
}