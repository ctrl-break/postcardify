{
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { PrismaClient } = require('@prisma/client');

	const prisma = new PrismaClient();

	async function grammarSeed() {
		const presentSimpleData = {
			code: 'Present Simple',
			description: 'Present Simple',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const presentSimple = await prisma.grammarRule.upsert({
			where: { code: 'Present Simple' },
			create: presentSimpleData,
			update: presentSimpleData,
		});

		const presentContiniousData = {
			code: 'Present Continuous',
			description: 'Present Continuous',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const presentContinious = await prisma.grammarRule.upsert({
			where: { code: 'Present Continuous' },
			create: presentContiniousData,
			update: presentContiniousData,
		});

		const presentPerfectData = {
			code: 'Present Perfect',
			description: 'Present Perfect',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const presentPerfect = await prisma.grammarRule.upsert({
			where: { code: 'Present Perfect' },
			create: presentPerfectData,
			update: presentPerfectData,
		});

		const presentPerfectContData = {
			code: 'Present Perfect Continuous',
			description: 'Present Perfect Continuous',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const presentPerfectCont = await prisma.grammarRule.upsert({
			where: { code: 'Present Perfect Continuous' },
			create: presentPerfectContData,
			update: presentPerfectContData,
		});

		const pastSimpleData = {
			code: 'Past Simple',
			description: 'Past Simple',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const pastSimple = await prisma.grammarRule.upsert({
			where: { code: 'Past Simple' },
			create: pastSimpleData,
			update: pastSimpleData,
		});

		const pastContiniousData = {
			code: 'Past Continuous',
			description: 'Past Continuous',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const pastContinious = await prisma.grammarRule.upsert({
			where: { code: 'Past Continuous' },
			create: pastContiniousData,
			update: pastContiniousData,
		});

		const pastPerfectData = {
			code: 'Past Perfect',
			description: 'Past Perfect',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const pastPerfect = await prisma.grammarRule.upsert({
			where: { code: 'Past Perfect' },
			create: pastPerfectData,
			update: pastPerfectData,
		});

		const pastPerfectContData = {
			code: 'Past Perfect Continuous',
			description: 'Past Perfect Continuous',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const pastPerfectCont = await prisma.grammarRule.upsert({
			where: { code: 'Past Perfect Continuous' },
			create: pastPerfectContData,
			update: pastPerfectContData,
		});

		const futureSimpleData = {
			code: 'Future Simple',
			description: 'Future Simple',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const futureSimple = await prisma.grammarRule.upsert({
			where: { code: 'Future Simple' },
			create: futureSimpleData,
			update: futureSimpleData,
		});

		const futureContiniousData = {
			code: 'Future Continuous',
			description: 'Future Continuous',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const futureContinious = await prisma.grammarRule.upsert({
			where: { code: 'Future Continuous' },
			create: futureContiniousData,
			update: futureContiniousData,
		});

		const futurePerfectData = {
			code: 'Future Perfect',
			description: 'Future Perfect',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const futurePerfect = await prisma.grammarRule.upsert({
			where: { code: 'Future Perfect' },
			create: futurePerfectData,
			update: futurePerfectData,
		});

		const futurePerfectContData = {
			code: 'Future Perfect Continuous',
			description: 'Future Perfect Continuous',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const futurePerfectCont = await prisma.grammarRule.upsert({
			where: { code: 'Future Perfect Continuous' },
			create: futurePerfectContData,
			update: futurePerfectContData,
		});

		console.log({ presentSimple, presentContinious, presentPerfect, presentPerfectCont });
		console.log({ pastSimple, pastContinious, pastPerfect, pastPerfectCont });
		console.log({ futureSimple, futureContinious, futurePerfect, futurePerfectCont });
	}

	grammarSeed()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
}
