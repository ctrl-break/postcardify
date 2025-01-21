import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryAssociationDto, CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Category, CategoryAssociation, Prisma } from '@prisma/client';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { DEFAULT_WORDS_PER_PAGE } from '../../common/constants';

const paginate: PaginatorTypes.PaginateFunction = paginator({ page: 1, perPage: DEFAULT_WORDS_PER_PAGE });

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async createCategory(data: CreateCategoryDto): Promise<Category> {
		return await this.prisma.category.create({ data });
	}

	async findBasicCategories(): Promise<Category[]> {
		return await this.prisma.category.findMany({ where: { userId: null } });
	}

	async findUserCategories(userId: number): Promise<Category[]> {
		return await this.prisma.category.findMany({ where: { userId } });
	}

	async findCategoryById(id: number): Promise<Category> {
		const result = await this.prisma.category.findUnique({ where: { id } });
		if (!result) {
			throw new NotFoundException(`Category with id ${id} not found`);
		}
		return result;
	}

	async findCategoryWords(id: number): Promise<CategoryAssociation[]> {
		const words = await this.prisma.categoryAssociation.findMany({
			where: { categoryId: id },
			include: {
				dictionary: true,
			},
		});
		if (!words) {
			throw new NotFoundException(`Category with id ${id} not found`);
		}
		return words;
	}

	async findWordsByCategory({
		where,
		orderBy,
		page,
		perPage,
	}: {
		where?: Prisma.CategoryAssociationWhereInput;
		orderBy?: Prisma.CategoryAssociationOrderByWithRelationInput;
		page?: number;
		perPage?: number;
	}): Promise<PaginatorTypes.PaginatedResult<CategoryAssociationDto>> {
		return paginate(
			this.prisma.categoryAssociation,
			{
				where: { ...where, vocabularyId: null },
				orderBy: { id: 'asc', ...orderBy },
				include: {
					dictionary: true,
				},
			},
			{
				page,
				perPage,
			},
		);
	}

	async updateCategory(id: number, data: UpdateCategoryDto): Promise<Category> {
		return await this.prisma.category.update({
			where: { id },
			data,
		});
	}

	async deleteCategory(id: number): Promise<Category> {
		return await this.prisma.category.delete({ where: { id } });
	}
}
