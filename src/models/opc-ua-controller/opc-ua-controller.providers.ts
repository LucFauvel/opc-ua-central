import { OpcUaController } from './opc-ua-controller.entity';

export const opcUaControllersProviders = [
  {
    provide: 'OPC_UA_CONTROLLERS_REPOSITORY',
    useValue: OpcUaController,
  },
];