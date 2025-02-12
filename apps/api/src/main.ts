import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './app/common/exception/exception.filter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as fs from 'fs';

async function bootstrap() {
    const globalPrefix = 'api/v1';
    const swaggerPrefix = 'swagger';
    const port = process.env.PORT || 3000;

    const app =
        process.env.NODE_ENV === 'production'
            ? await NestFactory.create(AppModule, {
                  httpsOptions: {
                      key: fs.readFileSync('/etc/letsencrypt/live/postcardify.online/privkey.pem'),
                      cert: fs.readFileSync('/etc/letsencrypt/live/postcardify.online/fullchain.pem'),
                  },
              })
            : await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.use(cookieParser());

    const CORSWhiteList = [
        'http://localhost:4200',
        'http://localhost:3000',
        'http://89.111.141.30',
        'https://89.111.141.30',
        'http://postcardify.online',
        'https://postcardify.online',
    ];
    const corsOptions: CorsOptions = {
        origin: (origin, callback) => {
            if (CORSWhiteList.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    };
    app.enableCors(corsOptions);

    if (process.env.NODE_ENV === 'development') {
        const config = new DocumentBuilder()
            .setTitle('Keep Speak')
            .setDescription('Keep Speak API description')
            .setVersion('0.1.0')
            .addTag('api')
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                'jwt',
            )
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup(swaggerPrefix, app, document);
    }

    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    Logger.log(`Swagger: http://localhost:${port}/${swaggerPrefix}`);
}

bootstrap();
