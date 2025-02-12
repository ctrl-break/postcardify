import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { ImageModule } from '../image/image.module';
import { UsageModule } from '../usage/usage.module';

@Module({
    imports: [UsageModule, ImageModule],
    providers: [VocabularyService],
    controllers: [VocabularyController],
})
export class VocabularyModule {}
