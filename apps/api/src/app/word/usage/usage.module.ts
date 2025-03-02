import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';

@Module({
    providers: [UsageService],
    controllers: [UsageController],
    exports: [UsageService],
})
export class UsageModule {}
