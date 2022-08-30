import { Machine } from './machine.entity';

export const machinesProviders = [
  {
    provide: 'MACHINES_REPOSITORY',
    useValue: Machine,
  },
];