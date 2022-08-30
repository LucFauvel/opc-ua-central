import { Sensor } from './sensor.entity';

export const sensorsProviders = [
  {
    provide: 'SENSORS_REPOSITORY',
    useValue: Sensor,
  },
];