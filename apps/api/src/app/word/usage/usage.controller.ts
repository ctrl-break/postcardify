import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, UnauthorizedException } from '@nestjs/common';
import { UserRequest } from '../../auth/token.model';
import { UsageService } from './usage.service';
import { CreateUsageDto, UpdateUsageDto, WordUsageDto } from './usage.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { WordUsage } from '@prisma/client';

@Controller('words/usage')
export class UsageController {
	constructor(private readonly usageService: UsageService) {}

	@Post()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordUsageDto })
	async create(@Req() req: UserRequest, @Body() createUsageDto: CreateUsageDto): Promise<WordUsage> {
		const userId = req.user?.id;
		if (userId) {
			return await this.usageService.createWordUsage(userId, createUsageDto);
		}
		throw new UnauthorizedException();
	}

	@Get(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordUsageDto, isArray: true })
	async findWordUsages(@Param('id') wordId: string): Promise<WordUsage[]> {
		return await this.usageService.findWordUsage(+wordId);
	}

	@Get(':id/user')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordUsageDto, isArray: true })
	async findUserWordUsages(@Req() req: UserRequest, @Param('id') wordId: string): Promise<WordUsage[]> {
		const id = req.user?.id;
		if (id) {
			return await this.usageService.findUserWordUsage(+wordId, id);
		}
		return [];
	}

	@Put(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordUsageDto })
	async update(@Req() req: UserRequest, @Param('id') id: string, @Body() updateUsageDto: UpdateUsageDto): Promise<WordUsage> {
		const userId = req.user?.id;
		if (userId) {
			return await this.usageService.updateWordUsage(userId, +id, updateUsageDto);
		}
		throw new UnauthorizedException();
	}

	@Delete(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordUsageDto })
	async remove(@Req() req: UserRequest, @Param('id') id: string): Promise<WordUsage> {
		const userId = req.user?.id;
		if (userId) {
			return await this.usageService.deleteWordUsage(userId, +id);
		}
		throw new UnauthorizedException();
	}
}
