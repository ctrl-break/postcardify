import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUsageDto, UpdateUsageDto } from './usage.dto';
import { WordUsage } from '@prisma/client';

@Injectable()
export class UsageService {
	constructor(private prisma: PrismaService) {}

	async createWordUsage(userId: number, data: CreateUsageDto): Promise<WordUsage> {
		return await this.prisma.wordUsage.create({ data: { ...data, userId } });
	}

	async findWordUsage(wordId: number): Promise<WordUsage[]> {
		return await this.prisma.wordUsage.findMany({ where: { wordId, isVerified: true } });
	}

	async findUserWordUsage(wordId: number, userId: number): Promise<WordUsage[]> {
		return await this.prisma.wordUsage.findMany({ where: { wordId, userId } });
	}

	async updateWordUsage(userId: number, usageId: number, data: UpdateUsageDto): Promise<WordUsage> {
		const userWordUsage = await this.prisma.wordUsage.findUnique({
			where: { id: usageId },
		});
		if (!userWordUsage) {
			throw new NotFoundException(`Usage example with id ${usageId} not found`);
		}
		if (userWordUsage.userId !== userId) {
			throw new ForbiddenException();
		}
		return await this.prisma.wordUsage.update({
			where: { id: usageId },
			data,
		});
	}

	async deleteWordUsage(userId: number, usageId: number): Promise<WordUsage> {
		const userWordUsage = await this.prisma.wordUsage.findUnique({
			where: { id: usageId },
		});
		if (!userWordUsage) {
			throw new NotFoundException(`Usage example with id ${usageId} not found`);
		}
		if (userWordUsage.userId !== userId) {
			throw new ForbiddenException();
		}
		return await this.prisma.wordUsage.delete({ where: { id: usageId } });
	}
}
