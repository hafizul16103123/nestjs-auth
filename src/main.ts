import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';


async function bootstrap() {
	const logger = new Logger('Startup');
	const app = await NestFactory.create(AppModule);
	await app.listen(3000);
	logger.log(`App Started on http://localhost:3000`);
}
bootstrap();
