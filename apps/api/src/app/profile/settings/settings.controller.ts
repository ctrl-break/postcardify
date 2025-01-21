import { Controller, Get, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UserRequest } from '../../auth/token.model';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserSetting } from '@prisma/client';
import { UserSettingDto } from './settings.dto';

@Controller('profile/settings')
export class SettingsController {
	constructor(private readonly settingService: SettingsService) {}

	@Get()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: UserSettingDto, isArray: true })
	async getUserSettings(@Req() req: UserRequest): Promise<UserSetting[]> {
		const id = req.user?.id;
		if (id) {
			return await this.settingService.getUserSettings(id);
		}
		throw new UnauthorizedException();
	}
}
