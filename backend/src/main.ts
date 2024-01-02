import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  };
  app.enableCors(corsOptions);
  app.setGlobalPrefix('/api/v1');
  const options = new DocumentBuilder()
    .setTitle('Backend Documentation For Agastya Ecommerce')
    .setDescription(
      'This is the backend documentation for the ecommerce suite of agastya',
    )
    .setVersion('1.0')
    .addServer(process.env.DEVELOPMENT_URL, 'Development Environment')
    .addTag('Version1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
