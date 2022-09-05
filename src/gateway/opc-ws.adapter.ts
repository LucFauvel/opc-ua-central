import * as SocketIO from 'socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { MachinesService } from '../models/machine/machine.service';
import { parse as parseUrl } from 'url';
import { parse } from 'querystring';

export class OpcWsAdapter extends IoAdapter {
    private readonly machinesService: MachinesService;

    constructor(private app: INestApplicationContext) {
        super(app);
        this.machinesService = app.get(MachinesService);
    }

    createIOServer(port: number, options: SocketIO.ServerOptions): any {
        options.allowRequest = async (request, allowFunction) => {
            const apiKey = parse(parseUrl(request.url)?.query)?.apiKey as string;
            if (apiKey && await this.machinesService.validateApiKey(apiKey)) {
                return allowFunction(null, true);
            }

            return allowFunction('Unauthorized', false);
        }
        return super.createIOServer(port, options);
    }
}