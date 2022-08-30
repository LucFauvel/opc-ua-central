import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { sensorsProviders } from "./sensor.providers";
import { SensorsService } from "./sensor.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
      SensorsService,
      ...sensorsProviders,
    ],
  })
  export class SensorsModule {}