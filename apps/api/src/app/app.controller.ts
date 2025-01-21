import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiBearerAuth('jwt')
	getData() {
		return this.appService.getData();
	}
}
