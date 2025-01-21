import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWordDto, UpdateWordDto } from './word.dto';
import { Image, Prisma, Word } from '@prisma/client';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { DEFAULT_WORDS_PER_PAGE } from '../common/constants';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import { CreateImageDto } from './image/image.dto';
import { ImageService } from './image/image.service';
import { UnsplashService } from './image/unsplash/unsplash.service';

const paginate: PaginatorTypes.PaginateFunction = paginator({ page: 1, perPage: DEFAULT_WORDS_PER_PAGE });

@Injectable()
export class WordService {
	constructor(
		private prisma: PrismaService,
		private imageService: ImageService,
		private unsplashService: UnsplashService,
	) {}

	async createWord(data: CreateWordDto): Promise<Word> {
		return await this.prisma.word.create({ data });
	}

	async findWords({
		where,
		orderBy,
		page,
		perPage,
	}: {
		where?: Prisma.WordWhereInput;
		orderBy?: Prisma.WordOrderByWithRelationInput;
		page?: number;
		perPage?: number;
	}): Promise<PaginatorTypes.PaginatedResult<Word>> {
		return paginate(
			this.prisma.word,
			{
				where: { ...where, isVisible: true },
				orderBy: { id: 'asc', ...orderBy },
			},
			{
				page,
				perPage,
			},
		);
	}

	async findWordById(id: number): Promise<Word> {
		const word = await this.prisma.word.findUnique({ where: { id, isVisible: true }, include: { defaultImage: true } });
		if (!word) {
			throw new NotFoundException(`Word with id ${id} not found`);
		}
		const usages = await this.prisma.wordUsage.findMany({ where: { wordId: word.id, isVerified: true } });
		const result = {
			...word,
			usages,
		};
		return result;
	}

	async updateWord(id: number, data: UpdateWordDto): Promise<Word> {
		return await this.prisma.word.update({
			where: { id },
			data,
		});
	}

	async blockWord(id: number): Promise<Word> {
		return await this.prisma.word.update({
			where: { id },
			data: { isVisible: false },
		});
	}

	async updateWordImage(id: number): Promise<Image> {
		const word = await this.prisma.word.findUnique({ where: { id, isVisible: true } });
		if (!word) {
			throw new NotFoundException(`Word with id ${id} not found`);
		}
		const context = word.context ? word.word + ' ' + word.context : word.word;
		const photos = await this.unsplashService.searchPhotos(context);
		const image = this.convertPhotosToDefaultImage(photos!);
		const result = await this.imageService.create(image);
		await this.updateWord(id, { defaultImageId: result.id });
		return result;
	}

	private convertPhotosToDefaultImage(photo: Photos): CreateImageDto {
		const image = photo.results[0];
		return {
			url: image.urls.regular,
			urls: image.urls,
			provider: 'unsplash',
			externalId: image.id,
			authorLink: image.user.links.html,
			authorName: image.user.name,
			blurHash: image.blur_hash!,
			description: image.description!,
		};
	}
}
