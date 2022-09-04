import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthzModule } from './authz/authz.module';
import { MachinesModule } from './models/machine/machine.module';
import { OpcUaControllersModule } from './models/opc-ua-device/opc-ua-device.module';
import { ReadingsModule } from './models/reading/reading.module';
import { SensorsModule } from './models/sensor/sensor.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    MachinesModule, 
    OpcUaControllersModule,
    ReadingsModule,
    SensorsModule,
    AuthzModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
