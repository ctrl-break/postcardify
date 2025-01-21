import { Controller, Get, Post, Body, Param, Delete, Put, Req, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { VocabularyService } from './vocabulary.service';
import { UserRequest } from '../../auth/token.model';
import { CreateVocabularyDto, UpdateVocabularyDto, VocabularyDto } from './vocabulary.dto';
import { Vocabulary } from '@prisma/client';

@Controller('words/vocabulary')
export class VocabularyController {
	constructor(private readonly vocabularyService: VocabularyService) {}

	@Post()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: VocabularyDto })
	async create(@Req() req: UserRequest, @Body() createVocabularyDto: CreateVocabularyDto): Promise<Vocabulary> {
		const id = req.user?.id;
		if (id) {
			return await this.vocabularyService.createVocabulary(id, createVocabularyDto);
		}
		throw new UnauthorizedException();
	}

	@Get()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: VocabularyDto, isArray: true })
	async getUserVocabulary(@Req() req: UserRequest): Promise<Vocabulary[]> {
		const id = req.user?.id;
		if (id) {
			return await this.vocabularyService.getUserVocabulary(id);
		}
		throw new UnauthorizedException();
	}

	@Get(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: VocabularyDto })
	async findOne(@Req() req: UserRequest, @Param('id') id: string): Promise<Vocabulary> {
		const userId = req.user?.id;
		if (userId) {
			return await this.vocabularyService.findVocabularyWordById(userId, +id);
		}
		throw new UnauthorizedException();
	}

	@Put(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: VocabularyDto })
	async update(@Req() req: UserRequest, @Param('id') id: string, @Body() updateVocabularyDto: UpdateVocabularyDto): Promise<Vocabulary> {
		const userId = req.user?.id;
		if (userId) {
			return await this.vocabularyService.updateVocabulary(userId, +id, updateVocabularyDto);
		}
		throw new UnauthorizedException();
	}

	@Delete(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: VocabularyDto })
	async remove(@Req() req: UserRequest, @Param('id') id: string): Promise<Vocabulary> {
		const userId = req.user?.id;
		if (userId) {
			return await this.vocabularyService.deleteVocabulary(userId, +id);
		}
		throw new UnauthorizedException();
	}
}
