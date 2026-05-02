import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API tienda online')
    .setDescription('Documentacion practica auxiliatura backend')
    .setVersion('1.0')
    .build();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  app.getHttpAdapter().get('/api-json', (req, res) => {
    res.json(document);
  });
  app.use(
    '/docs',
    apiReference({
      url: '/api-json',
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
