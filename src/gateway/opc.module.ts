import { Module } from '@nestjs/common';
import { ReadingsModule } from '../models/reading/reading.module';
import { MachinesModule } from '../models/machine/machine.module';
import { OpcGateway } from './opc.gateway';

@Module({
  imports: [MachinesModule, ReadingsModule],
  providers: [OpcGateway],
  exports: [OpcGateway]
})
export class OpcModule {}