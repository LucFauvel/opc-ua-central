import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { SensorsModule } from "../sensor/sensor.module";
import { machinesProviders } from "./machine.providers";
import { MachinesService } from "./machine.service";

@Module({
    imports: [DatabaseModule, SensorsModule],
    providers: [
      MachinesService,
      ...machinesProviders,
    ],
    exports: [MachinesService]
  })
  export class MachinesModule {}