import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://auth-service:3001',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/auth/',
      },
    }),
  );

  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://user-service:3002',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/users/',
      },
    }),
  );
  app.use(
    '/pets',
    createProxyMiddleware({
      target: 'http://pet-service:3003',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/pets/',
      },
    }),
  );
  await app.listen(3000);
  console.log('Gateway is running on port 3000');
}
bootstrap();
