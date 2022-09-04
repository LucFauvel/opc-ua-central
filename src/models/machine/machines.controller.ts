import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Machine } from './machine.entity';
import { MachinesService } from './machine.service';

@ApiTags('machines')
@Controller('/machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get()
  @ApiOkResponse({ type: [Machine] })
  @UseGuards(AuthGuard('jwt'))
  getMachines(): Promise<Machine[]> {
    return this.machinesService.findAll();
  }
}
