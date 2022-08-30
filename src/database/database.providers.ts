import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Machine } from 'src/models/machine/machine.entity';
import { OpcUaController } from 'src/models/opc-ua-controller/opc-ua-controller.entity';
import { Reading } from 'src/models/reading/reading.entity';
import { Sensor } from 'src/models/sensor/sensor.entity';

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async (configService: ConfigService) => {
        const sequelize = new Sequelize({
          dialect: 'mssql',
          host: configService.get<string>('DATABASE_ADDRESS'),
          port: 3306,
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: 'OpcUaCentral',
        });
        sequelize.addModels([Machine, OpcUaController, Reading, Sensor]);
        await sequelize.sync();
        return sequelize;
      },
      inject: [ConfigService]
    },
  ];