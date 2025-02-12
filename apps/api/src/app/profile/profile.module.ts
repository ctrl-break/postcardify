import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SettingsModule } from './settings/settings.module';

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [SettingsModule],
})
export class ProfileModule {}
