import { OpcUaDevice } from './opc-ua-device.entity';

export const opcUaDevicesProviders = [
  {
    provide: 'OPC_UA_DEVICES_REPOSITORY',
    useValue: OpcUaDevice,
  },
];