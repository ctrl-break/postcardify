import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { WordService } from './word.service';
import { CreateWordDto, UpdateWordDto, WordDto } from './word.dto';
import { Roles } from '../common/decorators';
import { Image, Role, Word } from '@prisma/client';
import { ImageDto } from './image/image.dto';
import { PageDto } from '../common/dto/page.dto';
import { DEFAULT_WORDS_PER_PAGE } from '../common/constants';

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
    async findPagedWords(@Query('page') page: string, @Query('perPage') perPage: string): Promise<PageDto<Word>> {
        return await this.wordService.findWords({
            where: {},
            orderBy: {},
            page: +page || 1,
            perPage: +perPage || DEFAULT_WORDS_PER_PAGE,
        });
    }

	@Get('random')
    @ApiBearerAuth('jwt')
    @ApiResponse({ status: HttpStatus.OK, type: WordDto })
    async getRandomWord(): Promise<Word> {
        return await this.wordService.getRandomWord();
    }

    @Get('letter/:letter')
    @ApiBearerAuth('jwt')
    @ApiResponse({ status: HttpStatus.OK, type: WordDto })
    async getWordByLetter(@Query('page') page: string, @Query('perPage') perPage: string, @Param('letter') letter: string): Promise<PageDto<Word>> {
        return await this.wordService.findWords({
            where: { word: { startsWith: letter, mode: 'insensitive' } },
            orderBy: {},
            page: +page || 1,
            perPage: +perPage || DEFAULT_WORDS_PER_PAGE,
        });
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
