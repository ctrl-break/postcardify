import { Controller, Get, Post, Body, Param, Delete, Put, Req, HttpStatus, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryAssociationDto, CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { UserRequest } from '../../auth/token.model';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { ApiPaginatedResponse } from '../../common/dto/page.dto';

@Controller('words/category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
	async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
		return await this.categoryService.createCategory(createCategoryDto);
	}

	@Get()
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: CategoryDto, isArray: true })
	async findBasicCategories(): Promise<Category[]> {
		return await this.categoryService.findBasicCategories();
	}

	@Get('user')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: CategoryDto, isArray: true })
	async findUserCategories(@Req() req: UserRequest): Promise<Category[]> {
		const id = req.user?.id;
		if (id) {
			return await this.categoryService.findUserCategories(id);
		}
		return [];
	}

	@Get(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
	async findOne(@Param('id') id: string): Promise<Category> {
		return await this.categoryService.findCategoryById(+id);
	}

	@Get(':id/list')
	@ApiBearerAuth('jwt')
	@ApiPaginatedResponse(CategoryAssociationDto)
	async findWordsByCategory(
		@Param('id') id: string,
		@Query('page') page: string,
		@Query('perPage') perPage: string,
	): Promise<PaginatorTypes.PaginatedResult<CategoryAssociationDto>> {
		return await this.categoryService.findWordsByCategory({ where: { categoryId: +id }, orderBy: {}, page: +page, perPage: +perPage });
	}

	@Put(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
	async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
		return await this.categoryService.updateCategory(+id, updateCategoryDto);
	}

	@Delete(':id')
	@ApiBearerAuth('jwt')
	@ApiResponse({ status: HttpStatus.OK, type: CategoryDto })
	async remove(@Param('id') id: string): Promise<Category> {
		return await this.categoryService.deleteCategory(+id);
	}
}
