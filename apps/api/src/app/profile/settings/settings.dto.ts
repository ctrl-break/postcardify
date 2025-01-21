import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsBoolean, IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserSettingDto {
	@ApiProperty()
	@IsNumber()
	userId: number;

	@ApiProperty()
	@IsString()
	settingCode: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsBoolean()
	valueBool?: boolean;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	valueInt?: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsJSON()
	valueJson?: Record<string, string | number>;
}

export class UpdateUserSettingDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsBoolean()
	valueBool?: boolean;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	valueInt?: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsJSON()
	valueJson?: Record<string, string | number>;
}

export class UserSettingDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	userId: number;

	@ApiProperty({ enum: $Enums.ValueType, enumName: 'ValueType' })
	settingValueType: $Enums.ValueType;

	@ApiProperty()
	settingCode: string;

	@ApiProperty({ required: false })
	@IsOptional()
	valueBool?: boolean;

	@ApiProperty({ required: false })
	@IsOptional()
	valueInt?: number;

	@ApiProperty({ required: false, additionalProperties: true })
	@IsOptional()
	@IsJSON()
	valueJson?: Record<string, string | number>;
}
