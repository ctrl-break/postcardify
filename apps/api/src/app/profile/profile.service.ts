import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponse } from '../user/responses';
import { ProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async getProfileData(userId: number): Promise<ProfileDto> {
        const user = await this.prisma.user.findFirst({ where: { id: userId } });
        if (user) {
            return new UserResponse(user);
        }
        throw new NotFoundException(`User not found`);
    }
}
