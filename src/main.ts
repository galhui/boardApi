import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Board example')
    .setDescription('The board API description')
    .setVersion('1.0')
    .addTag('board')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  
  const configService = app.get(ConfigService);
  
  const httpPort = configService.get('port')
  await app.listen(httpPort);
}
bootstrap();
