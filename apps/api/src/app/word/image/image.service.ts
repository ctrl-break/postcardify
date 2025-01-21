import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateImageDto, UpdateImageDto } from './image.dto';
import { Image } from '@prisma/client';
import { UnsplashService } from './unsplash/unsplash.service';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

@Injectable()
export class ImageService {
	constructor(
		private prisma: PrismaService,
		private unsplashService: UnsplashService,
	) {}

	async create(imageData: CreateImageDto): Promise<Image> {
		return this.prisma.image.create({ data: imageData });
	}

	async findAll(): Promise<Image[]> {
		return this.prisma.image.findMany();
	}

	async findById(id: number): Promise<Image | null> {
		return this.prisma.image.findUnique({ where: { id } });
	}

	async update(imgId: number, imageData: UpdateImageDto): Promise<Image> {
		return this.prisma.image.update({ where: { id: imgId }, data: imageData });
	}

	async delete(id: number) {
		return this.prisma.image.delete({ where: { id } });
	}

	/* external api */

	async searchImages(query: string): Promise<Photos | undefined> {
		return this.unsplashService.searchPhotos(query);
	}
}
