import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { parse } from "querystring";
import { Server, Socket } from "socket.io";
import { MachinesService } from "../models/machine/machine.service";
import { parse as parseUrl } from "url";
import { ReadingsService } from "../models/reading/reading.service";
import { Reading } from "../models/reading/reading.entity";

export class RawReading {
    sensorId: string;
    value: number;
    readAt: Date;
}

@WebSocketGateway()
export class OpcGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(private readonly machinesService: MachinesService, private readonly readingsService: ReadingsService) {}

    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const apiKey = parse(parseUrl(client.request.url)?.query)?.apiKey as string;
            const machine = await this.machinesService.getMachineFromApiKey(apiKey);
            client.data.machineId = machine?.id;
            client.emit('load-configs', JSON.stringify(machine.devices))
        } catch {
            console.warn('Disconnecting socket due to missing or invalid api key');
            client.disconnect(true)
        }
    }

    async getMachineSocketStatus(machineId: string): Promise<string> {
        const sockets = await this.server.fetchSockets();
        const socket = sockets.find(x => x.data.machineId == machineId)
        if (!!socket) {
            return 'connected';
        }

        return 'disconnected'
    }

    @SubscribeMessage('value-read')
    async handleValueRead(@MessageBody() data: RawReading, @ConnectedSocket() client: Socket) {
        const reading = new Reading();
        reading.value = data.value;
        reading.sensorId = data.sensorId;
        reading.readAt = data.readAt;
        await this.readingsService.insert(reading);
    }

}
