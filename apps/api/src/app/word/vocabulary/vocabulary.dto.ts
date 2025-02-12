import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { MAX_MEANING_LENGTH, MAX_WORD_LENGTH } from '../limits';
import { ApiProperty } from '@nestjs/swagger';
import { WordDto } from '../word.dto';

export class CreateVocabularyDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    wordId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_WORD_LENGTH)
    userWord?: string;

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

    @ApiProperty({
        type: Number,
        required: false,
    })
    @IsOptional()
    imageId: number;
}

export class UpdateVocabularyDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @MaxLength(MAX_WORD_LENGTH)
    userWord?: string;

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
}

export class VocabularyDto {
    @ApiProperty()
    id: number;

    @ApiProperty({
        type: Number,
        required: false,
    })
    @IsOptional()
    wordId: number;

    @ApiProperty({
        type: Number,
        required: false,
    })
    @IsOptional()
    imageId: number;

    @ApiProperty()
    userWord: string;

    @ApiProperty({ required: false })
    @IsOptional()
    word: WordDto;

    @ApiProperty({ required: false })
    @IsOptional()
    translation: string;

    @ApiProperty({ required: false })
    @IsOptional()
    meaning: string;

    @ApiProperty({ required: false })
    @IsOptional()
    transcription: string;

    @ApiProperty({
        type: Number,
    })
    userId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
