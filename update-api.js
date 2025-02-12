const fs = require('fs');

fs.writeFileSync(
    './apps/front/src/6-shared/api/generated/services/index.ts',
    `
export { AppService } from './app.service';
export { AuthService } from './auth.service';
export { SettingsService } from './settings.service';
export { WordService } from './word.service';
export { VocabularyService } from './vocabulary.service';
export { UsageService } from './usage.service';
export { ImageService } from './image.service';
export { CategoryService } from './category.service';
export { ProfileService } from './profile.service';

`,
    function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('The file was saved!');
    },
);

fs.writeFileSync(
    './apps/front/src/6-shared/api/generated/index.ts',
    `
export * from './services';
export { ApiConfiguration } from './api-configuration';
export * from './models';

`,
    function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('The file was saved!');
    },
);
