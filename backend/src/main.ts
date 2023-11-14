import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { config } from './config';
import swaggerInit from './swagger'

async function bootstrap() {
  const logger = new Logger('recourser')
  logger.log('Server of recourser app is starting...')
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true
  });
  app.useLogger(logger)
  app.setGlobalPrefix(config.app.prefix)
  app.enableCors()
  app.useBodyParser('json', {limit: '50mb'})
  app.useBodyParser('urlencoded', {limit: '50mb', extended: true})

  swaggerInit(app)

  await app.listen(config.app.port);

  console.log(`
  Started at http://localhost:${config.app.port}/${config.app.prefix}`)
}

bootstrap()