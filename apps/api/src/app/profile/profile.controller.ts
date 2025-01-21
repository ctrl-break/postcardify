import { Controller, Get, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import { UserRequest } from '../auth/token.model';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from '../user/responses';
import { ProfileDto } from './profile.dto';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: ProfileDto })
	async getProfileData(@Req() req: UserRequest): Promise<UserResponse> {
		const id = req.user?.id;
		if (id) {
			return await this.profileService.getProfileData(id);
		}
		throw new UnauthorizedException();
	}
}
