

import { LoggingInterceptor, TimeoutInterceptor, ValidationPipe } from '@common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLogger } from './configs';
import env from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger()
  });
  const swaggerConfigs = new DocumentBuilder()
    .setTitle('Nestjs example')
    .setDescription('the nestjs example API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfigs)
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  app.enableShutdownHooks();
  await app.listen(env.get('port'));
}
bootstrap();
