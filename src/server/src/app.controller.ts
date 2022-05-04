import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync, writeFile, existsSync } from 'fs';
import { resolve } from 'path';

import configuration from './configuration';

import { ResultBuildingData, TaskBuildingData } from '../../shared/entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/task/building/:id')
  taskBuildingRoute(@Param('id') id: string): TaskBuildingData {
    const path = resolve(configuration().apiDataPath, `task/building/${id}`);
    if (!existsSync(path)) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `building task ${id} not found`,
      }, HttpStatus.NOT_FOUND);
    }
    const data = readFileSync(path, 'utf8');
    return JSON.parse(data);
  }

  @Post('api/result/building/:id')
  resultBuildingRoute(@Param('id') id: string, @Body() resultBuildingData: ResultBuildingData) {
    const path = resolve(configuration().apiDataPath, `result/building/${id}`);
    const j = JSON.stringify(resultBuildingData);
    writeFile(path, j, err => {
      if (err) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `unable to save building result ${id}`,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  }
}
