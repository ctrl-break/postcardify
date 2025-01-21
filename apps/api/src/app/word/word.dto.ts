import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { MAX_MEANING_LENGTH, MAX_WORD_LENGTH } from './limits';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import { WordUsageDto } from './usage/usage.dto';
import { ImageDto } from './image/image.dto';

export class CreateWordDto {
	@ApiProperty()
	@IsString()
	@MaxLength(MAX_WORD_LENGTH)
	word: string;

	@ApiProperty()
	@IsString()
	@MaxLength(MAX_WORD_LENGTH)
	translation: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@MaxLength(MAX_MEANING_LENGTH)
	meaning?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@MaxLength(MAX_WORD_LENGTH)
	transcription?: string;
}

export class UpdateWordDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@MaxLength(MAX_WORD_LENGTH)
	word?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@MaxLength(MAX_WORD_LENGTH)
	translation?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@MaxLength(MAX_MEANING_LENGTH)
	meaning?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	@MaxLength(MAX_WORD_LENGTH)
	transcription?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => parseInt(value))
	defaultImageId?: number;
}

export class WordDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	word: string;

	@ApiProperty({ required: false })
	@IsOptional()
	context: string;

	@ApiProperty()
	translation: string;

	@ApiProperty({ type: 'object', additionalProperties: true })
	translateVariants: Prisma.JsonValue;

	@ApiProperty({ required: false })
	@IsOptional()
	meaning: string;

	@ApiProperty({ required: false })
	@IsOptional()
	transcription: string;

	@ApiProperty({ required: false })
	@IsOptional()
	defaultImageId: number;

	@ApiProperty({ required: false })
	@IsOptional()
	defaultImage: ImageDto;

	@ApiProperty({ required: false, enum: $Enums.Part_of_Speech, enumName: 'Part_of_Speech' })
	@IsOptional()
	pos: $Enums.Part_of_Speech | null;

	@ApiProperty()
	isVisible: boolean;

	@ApiProperty({ required: false, isArray: true })
	@IsOptional()
	usages?: WordUsageDto;
}
