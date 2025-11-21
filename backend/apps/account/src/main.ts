import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import {
  CONTEXT_PATH,
  NODE_ENV,
  PORT,
  SWAGGER_ENDPOINT,
} from './app.environment';
import { HttpExceptionFilter } from '@libs/common/filters/http-exception.filter';
import { TransformInterceptor } from '@libs/common/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '@libs/common/interceptors/error.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .setTitle('Edas Agent')
  .setDescription('Edas Agent Account Web APIs')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.enableCors();
  app.flushLogs();
  app.setGlobalPrefix(CONTEXT_PATH, {
    exclude: ['health'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(app.get(Reflector)),
    new ErrorsInterceptor(),
    new LoggerErrorInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableShutdownHooks();

  if (NODE_ENV != 'production') {
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(SWAGGER_ENDPOINT, app, document);
  }

  await app.listen(PORT);
}

bootstrap().catch((e) => {
  console.log(`Server encountered an exception ${e}`);
});
