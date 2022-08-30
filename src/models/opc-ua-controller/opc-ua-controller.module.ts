import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { opcUaControllersProviders } from "./opc-ua-controller.providers";
import { OpcUaControllersService } from "./opc-ua-controller.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        OpcUaControllersService,
      ...opcUaControllersProviders,
    ],
  })
  export class OpcUaControllersModule {}