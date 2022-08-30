import { Inject, Injectable } from "@nestjs/common";
import { Machine } from "./machine.entity";

@Injectable()
export class MachinesService {
  constructor(
    @Inject('MACHINES_REPOSITORY')
    private machinesRepository: typeof Machine
  ) {}

  async findAll(): Promise<Machine[]> {
    return this.machinesRepository.findAll<Machine>();
  }
}