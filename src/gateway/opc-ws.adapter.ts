import * as SocketIO from 'socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { MachinesService } from '../models/machine/machine.service';
import { parse as parseUrl } from 'url';
import { parse } from 'querystring';
import { JwksClient } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

let jwksClient: JwksClient;

export class OpcWsAdapter extends IoAdapter {
    private readonly machinesService: MachinesService;
    private readonly configService: ConfigService;

    constructor(private app: INestApplicationContext) {
        super(app);
        this.machinesService = app.get(MachinesService);
        this.configService = app.get(ConfigService);
        jwksClient = new JwksClient({ jwksUri: `${this.configService.get<string>('AUTH0_ISSUER_URL')}.well-known/jwks.json` });
    }

    createIOServer(port: number, options: SocketIO.ServerOptions): any {
        options.allowRequest = async (request, allowFunction) => {
            const apiKey = parse(parseUrl(request.url)?.query)?.apiKey as string;
            if (apiKey && await this.machinesService.validateApiKey(apiKey)) {
                return allowFunction(null, true);
            }

            const hasValidToken = await new Promise((resolveOuter) => {
                const token = request.headers.authorization.replace("Bearer ", "");
                verify(token, this.getKey, { 
                    audience: this.configService.get<string>('AUTH0_AUDIENCE'), 
                    issuer: this.configService.get<string>('AUTH0_ISSUER_URL'),
                    algorithms: ['RS256']
                }, function(err, decoded) {
                    if (err) {
                        console.log(err);
                    }
                    resolveOuter(!!decoded);
                });
            });

            if (hasValidToken) {
                return allowFunction(null, true);
            }

            return allowFunction('Unauthorized', false);
        }
        return super.createIOServer(port, options);
    }

    getKey(header, callback) {
        jwksClient.getSigningKey(header.kid, function(err, key) {
          callback(null, key.getPublicKey());
        });
    }
}