import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyController } from './vocabulary.controller';

describe('VocabularyController', () => {
    let controller: VocabularyController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VocabularyController],
        }).compile();

        controller = module.get<VocabularyController>(VocabularyController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
