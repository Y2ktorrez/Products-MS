import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
  {
    transport: Transport.TCP,
    options: {
      port: env.port
    }

  });
  //Validacion Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      /*Convertir al tipo de dato esperado los DTO*/
      transform: true,
      transformOptions:{
        enableImplicitConversion: true,
      }
    })
  );  
  await app.listen();
  logger.log(`Products Microservices running on port ${env.port}`);
  
}
bootstrap();
