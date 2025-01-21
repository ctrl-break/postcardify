import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { WordService } from './word.service';
import { CreateWordDto, UpdateWordDto, WordDto } from './word.dto';
import { Roles } from '../common/decorators';
import { Image, Role, Word } from '@prisma/client';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { ImageDto } from './image/image.dto';

@Controller('words/word')
export class WordController {
	constructor(private readonly wordService: WordService) {}

	@Post()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordDto })
	@Roles(Role.ADMIN)
	async create(@Body() createWordDto: CreateWordDto): Promise<Word> {
		return await this.wordService.createWord(createWordDto);
	}

	@Get()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordDto, isArray: true })
	@Roles(Role.ADMIN)
	async findPagedWords(@Query('page') page: string, @Query('perPage') perPage: string): Promise<PaginatorTypes.PaginatedResult<Word>> {
		return await this.wordService.findWords({ where: {}, orderBy: {}, page: +page, perPage: +perPage });
	}

	@Get(':id/update-image')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: ImageDto })
	async findOneAndUpdateImage(@Param('id') id: string): Promise<Image> {
		return await this.wordService.updateWordImage(+id);
	}

	@Get(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordDto })
	async findOne(@Param('id') id: string): Promise<Word> {
		return await this.wordService.findWordById(+id);
	}

	@Put(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordDto })
	@Roles(Role.ADMIN)
	async update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto): Promise<Word> {
		return await this.wordService.updateWord(+id, updateWordDto);
	}

	@Delete(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: WordDto })
	@Roles(Role.ADMIN)
	async remove(@Param('id') id: string): Promise<Word> {
		return await this.wordService.blockWord(+id);
	}
}
