import { Reading } from './reading.entity';

export const readingsProviders = [
  {
    provide: 'READINGS_REPOSITORY',
    useValue: Reading,
  },
];