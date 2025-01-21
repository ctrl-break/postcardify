import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { UnsplashService } from './unsplash/unsplash.service';

@Module({
	providers: [ImageService, UnsplashService],
	controllers: [ImageController],
	exports: [ImageService, UnsplashService],
})
export class ImageModule {}
