import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { readingsProviders } from "./reading.providers";
import { ReadingsService } from "./reading.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
      ReadingsService,
      ...readingsProviders,
    ],
    exports: [ReadingsService]
  })
  export class ReadingsModule {}