import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
import { ValidationPipe } from 'core/pipe/validation.pipe';
import { HttpExceptionFilter } from 'core/filter/http-exception.filter';


async function bootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()

  const app = await NestFactory.create(AppModule);
  
  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Board example')
    .setDescription('The board API description')
    .setVersion('1.0')
    .addTag('board')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  
  // app configuration
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  
  const httpPort = configService.get('port')
  await app.listen(httpPort);
}
bootstrap();
