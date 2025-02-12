import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserSettingDto } from './settings.dto';
import { Prisma, UserSetting } from '@prisma/client';

@Injectable()
export class SettingsService {
    constructor(private prisma: PrismaService) {}

    async getUserSettings(userId: number): Promise<UserSetting[]> {
        const result = await this.prisma.userSetting.findMany({
            where: { userId },
            include: { setting: true },
        });
        if (!result || result.length === 0) {
            await this.createDefaultUserSettings(userId);
            return await this.prisma.userSetting.findMany({
                where: { userId },
                include: { setting: true },
            });
        }
        return result;
    }

    async createDefaultUserSettings(userId: number) {
        const result = await this.prisma.setting.findMany();
        await Promise.all(
            result.map(async (setting) => {
                await this.prisma.userSetting.create({
                    data: {
                        userId,
                        settingCode: setting.code,
                        settingValueType: setting.valueType,
                        valueBool: setting.defaultValueBool,
                        valueInt: setting.defaultValueInt,
                        valueJson: setting.defaultValueJson as Prisma.InputJsonValue,
                    },
                });
            }),
        );
        return true;
    }

    async updateUserSetting(id: number, settingCode: string, updateUserSettingDto: UpdateUserSettingDto) {
        const existingUserSetting = await this.prisma.userSetting.findUnique({
            where: { id, settingCode },
        });

        if (!existingUserSetting) {
            throw new NotFoundException('User setting not found');
        }

        return await this.prisma.userSetting.update({
            where: { id, settingCode },
            data: { ...updateUserSettingDto },
        });
    }

    // async deleteUserSetting(id: number) {
    // 	const userSetting = await this.prisma.userSetting.findUnique(id);

    // 	if (!userSetting) {
    // 		throw new NotFoundException('User setting not found');
    // 	}

    // 	await this.userSettingRepository.remove(userSetting);
    // 	return { success: true, message: 'User setting deleted successfully' };
    // }
}
