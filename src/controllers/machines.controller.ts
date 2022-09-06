import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Machine } from '../models/machine/machine.dto';
import { MachinesService } from '../models/machine/machine.service';
import { OpcGateway } from '../gateway/opc.gateway';
import { CreateMachineDto } from '../dto/createmachine.dto';

@ApiTags('machines')
@Controller('/machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService, private readonly opcGateway: OpcGateway) {}

  @Get()
  @ApiOkResponse({ type: [Machine] })
  @UseGuards(AuthGuard('jwt'))
  async getMachines(): Promise<Machine[]> {
    const machineEntities = await this.machinesService.findAll();
    let machines: Machine[] = []
    for(let machine of machineEntities) {
      const machineStatus = await this.opcGateway.getMachineSocketStatus(machine.id);
      machines.push({
        id: machine.id,
        name: machine.name,
        serial: machine.serial,
        apiKey: machine.apiKey,
        status: machineStatus,
        devices: machine.devices.map((device) => {
          return {
            id: device.id,
            name: device.name,
            address: device.address,
            sensors: device.sensors.map((sensor) => {
              return {
                id: sensor.id,
                name: sensor.name,
                type: sensor.type,
                nodeId: sensor.nodeId
              }
            })
          }
        })
      })
    }

    return machines;
  }

  @Post()
  @ApiOkResponse({ type: Machine })
  @UseGuards(AuthGuard('jwt'))
  async createMachine(@Body() createMachineDto: CreateMachineDto): Promise<Machine> {
    return this.machinesService.createFromDto(createMachineDto).then((createdMachine) => {
      return {
        id: createdMachine.id,
        name: createdMachine.name,
        serial: createdMachine.serial,
        apiKey: createdMachine.apiKey,
        status: 'disconnected',
        devices: createdMachine.devices.map((device) => {
          return {
            id: device.id,
            name: device.name,
            address: device.address,
            sensors: device.sensors.map((sensor) => {
              return {
                id: sensor.id,
                name: sensor.name,
                type: sensor.type,
                nodeId: sensor.nodeId
              }
            })
          }
        })
      }
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string): Promise<void> {
    await this.machinesService.delete(id);
  }
}
