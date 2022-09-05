import { Module } from "@nestjs/common";
import { OpcModule } from "../gateway/opc.module";
import { MachinesModule } from "../models/machine/machine.module";
import { MachinesController } from "./machines.controller";

@Module({
    imports: [MachinesModule, OpcModule],
    controllers: [MachinesController]
  })
export class ControllersModule {}