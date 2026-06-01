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

  app.use(
    '/breeds',
    createProxyMiddleware({
      target: 'http://pet-service:3003',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/breeds/',
      },
    }),
  );

  app.use(
    '/notifications',
    createProxyMiddleware({
      target: 'http://pet-service:3004',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/notifications/',
      },
    }),
  );

  app.use(
    '/vaccine-pet',
    createProxyMiddleware({
      target: 'http://vaccine-service:3005',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/vaccine-pet/',
      },
    }),
  );
  app.use(
    '/vaccine-category',
    createProxyMiddleware({
      target: 'http://vaccine-service:3005',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/vaccine-category/',
      },
    }),
  );
  app.use(
    '/appointment',
    createProxyMiddleware({
      target: 'http://appointment-service:3006',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/appointment/',
      },
    }),
  );
  app.use(
    '/medical-record',
    createProxyMiddleware({
      target: 'http://medical-record-service:3007',
      changeOrigin: true,
      pathRewrite: {
        '^/': '/medical-record/',
      },
    }),
  );
  await app.listen(3000);
  console.log('Gateway is running on port 3000');
}
bootstrap();
