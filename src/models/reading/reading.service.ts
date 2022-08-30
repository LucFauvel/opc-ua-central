import { Inject, Injectable } from "@nestjs/common";
import { Reading } from "./reading.entity";

@Injectable()
export class ReadingsService {
  constructor(
    @Inject('READINGS_REPOSITORY')
    private readingsRepository: typeof Reading
  ) {}

  async findAll(): Promise<Reading[]> {
    return this.readingsRepository.findAll<Reading>();
  }
}