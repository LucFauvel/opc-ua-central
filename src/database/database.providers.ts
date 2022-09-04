import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Machine } from '../models/machine/machine.entity';
import { OpcUaDevice } from '../models/opc-ua-device/opc-ua-device.entity';
import { Reading } from '../models/reading/reading.entity';
import { Sensor } from '../models/sensor/sensor.entity';

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async (configService: ConfigService) => {
        const sequelize = new Sequelize({
          dialect: 'mssql',
          host: configService.get<string>('DATABASE_ADDRESS'),
          port: 1433,
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: 'OpcUaCentral',
        });
        sequelize.addModels([Machine, OpcUaDevice, Reading, Sensor]);
        await sequelize.sync();
        return sequelize;
      },
      inject: [ConfigService]
    },
  ];