import { Injectable } from '@nestjs/common';
import { createApi } from 'unsplash-js';
import { DEFAULT_IMAGES_PER_PAGE } from '../../../common/constants';

@Injectable()
export class UnsplashService {
	unsplash = createApi({
		accessKey: process.env.UNSPLASH_ACCESS_KEY,
	});

	async getRandomPhoto() {
		const { response } = await this.unsplash.photos.getRandom({
			query: 'nature',
			count: 1,
		});
		return response;
	}

	async getRandomPhotos(count: number) {
		const { response } = await this.unsplash.photos.getRandom({
			query: 'nature',
			count,
		});
		return response;
	}

	async searchPhotos(query: string) {
		const { response } = await this.unsplash.search.getPhotos({
			query,
			perPage: DEFAULT_IMAGES_PER_PAGE,
		});
		return response;
	}

	async getPhoto(id: string) {
		const { response } = await this.unsplash.photos.get({
			photoId: id,
		});
		return response;
	}
}
