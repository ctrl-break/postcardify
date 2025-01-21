{
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { PrismaClient } = require('@prisma/client');

	const prisma = new PrismaClient();

	async function runSettingsSeed() {
		const themeData = {
			name: 'interface',
			code: 'interface_dark_theme',
			description: 'Отображать тёмную тему',
			valueType: 'Boolean',
			defaultValueBool: false,
		};
		const dark = await prisma.setting.upsert({
			where: { code: 'interface_dark_theme' },
			create: themeData,
			update: themeData,
		});

		const langData = {
			name: 'interface',
			code: 'interface_language',
			description: 'Язык интерфейса',
			valueType: 'Json',
			defaultValueJson: [
				{
					language: 'English',
					selected: true,
				},
				{
					language: 'Русский',
					selected: false,
				},
			],
		};
		const lang = await prisma.setting.upsert({
			where: { code: 'interface_language' },
			create: langData,
			update: langData,
		});

		const stepsData = {
			name: 'steps',
			code: 'step_repeat',
			description: 'Количество повторов при изучении слова',
			valueType: 'Number',
			defaultValueInt: 6,
		};
		const steps = await prisma.setting.upsert({
			where: { code: 'step_repeat' },
			create: stepsData,
			update: stepsData,
		});

		const intervalsData = {
			name: 'steps',
			code: 'step_intervals',
			description: 'Интервалы при изучении слов (в часах)',
			valueType: 'Json',
			defaultValueJson: [
				{
					step: 1,
					interval: 6,
				},
				{
					step: 2,
					interval: 24,
				},
				{
					step: 3,
					interval: 48,
				},
				{
					step: 4,
					interval: 72,
				},
				{
					step: 5,
					interval: 168,
				},
				{
					step: 6,
					interval: 336,
				},
			],
		};
		const step_intervals = await prisma.setting.upsert({
			where: { code: 'step_intervals' },
			create: intervalsData,
			update: intervalsData,
		});

		const stepBackData = {
			name: 'steps',
			code: 'step_back',
			description: 'Переходить на шаг назад если слово забыто',
			valueType: 'Boolean',
			defaultValueBool: true,
		};
		const stepBack = await prisma.setting.upsert({
			where: { code: 'step_back' },
			create: stepBackData,
			update: stepBackData,
		});

		console.log({ dark, lang, steps, step_intervals, stepBack });
	}
	runSettingsSeed()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
}
