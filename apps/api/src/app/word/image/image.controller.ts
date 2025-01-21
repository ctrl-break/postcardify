import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ImageService } from './image.service';
import { Role, Image } from '@prisma/client';
import { CreateImageDto, ImageDto } from './image.dto';
import { Roles } from '../../common/decorators';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

@Controller('images')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Get()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: ImageDto, isArray: true })
	@Roles(Role.ADMIN)
	async findAll(): Promise<Image[]> {
		return this.imageService.findAll();
	}

	@Get('search')
	@ApiBearerAuth('jwt')
	@Roles(Role.ADMIN)
	searchImages(@Query('query') query: string): Promise<Photos | undefined> {
		return this.imageService.searchImages(query);
	}

	@Get(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: ImageDto })
	@Roles(Role.ADMIN)
	findById(@Param('id') id: string) {
		return this.imageService.findById(+id);
	}

	@Post()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: ImageDto })
	@Roles(Role.ADMIN)
	create(@Body() imageData: CreateImageDto): Promise<Image> {
		return this.imageService.create(imageData);
	}
}
