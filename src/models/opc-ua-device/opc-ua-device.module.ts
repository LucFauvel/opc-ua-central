import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { opcUaDevicesProviders } from "./opc-ua-device.providers";
import { OpcUaDevicesService } from "./opc-ua-device.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
      OpcUaDevicesService,
      ...opcUaDevicesProviders,
    ],
  })
  export class OpcUaControllersModule {}