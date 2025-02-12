import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_SENTENCE_LENGTH } from '../limits';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsageDto {
    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    wordId: number;

    @ApiProperty()
    @IsString()
    @MaxLength(MAX_SENTENCE_LENGTH)
    sentence: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_SENTENCE_LENGTH)
    translation?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    grammarRuleId?: number;
}

export class UpdateUsageDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_SENTENCE_LENGTH)
    sentence?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_SENTENCE_LENGTH)
    translation?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    grammarRuleId?: number;
}

export class WordUsageDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    sentence: string;

    @ApiProperty({ required: false })
    @IsOptional()
    translation?: string;

    @ApiProperty()
    isVerified: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    wordId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    vocabularyId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    userId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    grammarRuleId: number;
}
