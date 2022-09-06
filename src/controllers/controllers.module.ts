import { Module } from "@nestjs/common";
import { ReadingsModule } from "../models/reading/reading.module";
import { OpcModule } from "../gateway/opc.module";
import { MachinesModule } from "../models/machine/machine.module";
import { MachinesController } from "./machines.controller";
import { ReadingsController } from "./readings.controller";

@Module({
    imports: [
      MachinesModule, 
      ReadingsModule, 
      OpcModule
    ],
    controllers: [MachinesController, ReadingsController]
  })
export class ControllersModule {}