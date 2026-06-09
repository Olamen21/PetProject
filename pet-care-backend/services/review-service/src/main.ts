import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const Config = new DocumentBuilder()
    .setTitle('Pet Care - Medical Record Service')
    .setDescription('Tài liệu API cho dịch vụ quản lý hồ sơ y tế')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Nhập Token của bạn vào đây',
        in: 'header',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, Config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3009);
}
bootstrap();
