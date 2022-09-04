import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { machinesProviders } from "./machine.providers";
import { MachinesService } from "./machine.service";
import { MachinesController } from "./machines.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [MachinesController],
    providers: [
      MachinesService,
      ...machinesProviders,
    ],
  })
  export class MachinesModule {}