import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsOptional, IsString, IsJSON } from 'class-validator';

export class CreateImageDto {
	@ApiProperty()
	@IsString()
	url: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsJSON()
	urls?: Record<string, string>;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	externalId?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	authorName?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	authorLink?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	blurHash?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	provider?: 'unsplash' | 'pixabay' | 'local';
}

export class UpdateImageDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	url?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsJSON()
	urls?: string;
}

export class ImageDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	url: string;

	@ApiProperty({ type: 'object', additionalProperties: true })
	urls: Record<string, string>;

	@ApiProperty({ required: false })
	@IsOptional()
	description: string;

	@ApiProperty({ required: false })
	@IsOptional()
	externalId: string;

	@ApiProperty({ required: false })
	@IsOptional()
	authorName: string;

	@ApiProperty({ required: false })
	@IsOptional()
	authorLink: string;

	@ApiProperty({ required: false })
	@IsOptional()
	blurHash: string;

	@ApiProperty({ required: false, enum: $Enums.ImageProvider, enumName: 'ImageProvider' })
	@IsOptional()
	provider: $Enums.ImageProvider | null;
}
