import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyService } from './vocabulary.service';

describe('VocabularyService', () => {
	let service: VocabularyService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [VocabularyService],
		}).compile();

		service = module.get<VocabularyService>(VocabularyService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
