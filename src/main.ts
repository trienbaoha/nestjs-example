import { AllExceptionsFilter } from '@common';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import env from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfigs = new DocumentBuilder()
    .setTitle('Nestjs example')
    .setDescription('the nestjs example API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfigs)
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(env.get('port'));
}
bootstrap();
