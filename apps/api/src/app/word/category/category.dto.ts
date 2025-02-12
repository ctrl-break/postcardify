import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { MAX_SENTENCE_LENGTH, MAX_WORD_LENGTH } from '../limits';
import { ApiProperty } from '@nestjs/swagger';
import { WordDto } from '../word.dto';

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @MaxLength(MAX_WORD_LENGTH)
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_SENTENCE_LENGTH)
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    icon?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    userId?: number;
}

export class UpdateCategoryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_WORD_LENGTH)
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    icon?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_SENTENCE_LENGTH)
    description?: string;
}

export class CategoryDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    icon?: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    userId: number;
}

export class CategoryAssociationDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    categoryId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    vocabularyId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    wordId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    dictionary?: WordDto;
}
