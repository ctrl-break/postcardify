import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { CategoryModule } from './category/category.module';
import { UsageModule } from './usage/usage.module';
import { ImageModule } from './image/image.module';

@Module({
	providers: [WordService],
	controllers: [WordController],
	imports: [VocabularyModule, CategoryModule, UsageModule, ImageModule],
})
export class WordModule {}
