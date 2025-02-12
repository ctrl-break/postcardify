import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVocabularyDto, UpdateVocabularyDto } from './vocabulary.dto';
import { Vocabulary } from '@prisma/client';
import { UsageService } from '../usage/usage.service';

@Injectable()
export class VocabularyService {
    constructor(private prisma: PrismaService, private usageService: UsageService) {}

    async createVocabulary(userId: number, data: CreateVocabularyDto): Promise<Vocabulary> {
        if (!data.userWord && !data.wordId) {
            throw new BadRequestException('Either userWord or wordId must be provided');
        }
        if (data.wordId) {
            const word = await this.prisma.word.findUnique({
                where: { id: data.wordId },
            });
            if (!word) {
                throw new NotFoundException(`Word with id ${data.wordId} not found`);
            }
            const vocabularyWord = {
                wordId: data.wordId,
                userWord: word.word,
                translation: word.translation,
                meaning: word.meaning,
                transcription: word.transcription,
                imageId: word.defaultImageId,
                userId,
            };
            return await this.prisma.vocabulary.create({
                data: { ...vocabularyWord, userId },
                include: {
                    word: true,
                },
            });
        }
        return await this.prisma.vocabulary.create({
            data: { ...data, userId },
            include: {
                word: true,
            },
        });
    }

    async getUserVocabulary(userId: number): Promise<Vocabulary[]> {
        return await this.prisma.vocabulary.findMany({
            where: { userId },
            include: {
                word: true,
            },
            orderBy: {
                userWord: 'asc',
            },
        });
    }

    async findVocabularyWordById(userId: number, vocId: number): Promise<Vocabulary> {
        const userWord = await this.prisma.vocabulary.findUnique({
            where: { id: vocId, userId },
            include: {
                word: {
                    include: {
                        defaultImage: true,
                    },
                },
            },
        });
        if (!userWord) {
            throw new NotFoundException(`Vocabulary word with id ${vocId} not found`);
        }
        if (userId !== userWord.userId) {
            throw new ForbiddenException();
        }
        if (userWord.wordId) {
            const usages = await this.usageService.findWordUsage(userWord.wordId);
            const result = {
                ...userWord,
                word: { ...userWord.word, usages },
            };

            return result;
        }
        return userWord;
    }

    async updateVocabulary(userId: number, vocId: number, data: UpdateVocabularyDto): Promise<Vocabulary> {
        const userWord = await this.prisma.vocabulary.findUnique({
            where: { id: vocId },
        });
        if (!userWord) {
            throw new NotFoundException(`Vocabulary word with id ${vocId} not found`);
        }
        if (userWord.userId !== userId) {
            throw new ForbiddenException();
        }
        return await this.prisma.vocabulary.update({
            where: { id: vocId },
            data,
        });
    }

    async deleteVocabulary(userId: number, vocId: number): Promise<Vocabulary> {
        const userWord = await this.prisma.vocabulary.findUnique({
            where: { id: vocId },
        });
        if (!userWord) {
            throw new NotFoundException(`Vocabulary word with id ${vocId} not found`);
        }
        if (userWord.userId !== userId) {
            throw new ForbiddenException();
        }
        return await this.prisma.vocabulary.delete({ where: { id: vocId } });
    }
}
