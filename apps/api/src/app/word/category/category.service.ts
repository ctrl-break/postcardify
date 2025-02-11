import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryAssociationDto, CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Category, CategoryAssociation, Prisma } from '@prisma/client';
import { PageDto } from '../../common/dto/page.dto';


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
	}): Promise<PageDto<CategoryAssociationDto>> {
		const skip = (page - 1) * perPage;
		const take = perPage;
		const result = await this.prisma.categoryAssociation.findMany({
			where: { ...where, vocabularyId: null },
			orderBy: { id: 'asc', ...orderBy },
			include: {
			  dictionary: true,
			},
			skip,
			take,
		  });

		  return {
			data: result,
			meta: {
			  perPage,
			  total: await this.prisma.categoryAssociation.count({ where: { ...where, vocabularyId: null } }),
			  lastPage: Math.ceil((await this.prisma.categoryAssociation.count({ where: { ...where, vocabularyId: null } })) / perPage),
			  prev: page > 1 ? page - 1 : null,
			  next: page < Math.ceil((await this.prisma.categoryAssociation.count({ where: { ...where, vocabularyId: null } })) / perPage) ? page + 1 : null,
			  currentPage: page,
			}
		  }
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
