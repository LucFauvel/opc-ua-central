import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { machinesProviders } from "./machine.providers";
import { MachinesService } from "./machine.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
      MachinesService,
      ...machinesProviders,
    ],
  })
  export class MachinesModule {}