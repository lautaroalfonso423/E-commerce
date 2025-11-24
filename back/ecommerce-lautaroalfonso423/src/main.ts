import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './Middleware/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {json} from "express"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { conectionSource } from './Config/databaseConfig';



async function bootstrap() {

 await conectionSource.initialize()
    .then(() => console.log('DataSource initialized'))
    .catch((err) => {
      console.error('Error during DataSource initialization', err);
      process.exit(1); 
    });



  const app = await NestFactory.create(AppModule);
  
  app.use(json())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const CleanErrors = errors.map(errors =>{
          return {property: errors.property, constraints: errors.constraints}
        })
        return new BadRequestException({
          alert: 
          "Errores detectados",
          errors: CleanErrors
        })
      },
    })
  )
  app.use(loggerGlobal)
  
  
  const swaggerConfig = new DocumentBuilder()
                      .setTitle("Proyecto N°4 de Nest.js")
                      .setDescription("Documentación de rutas para el proyecto final")
                      .setVersion("11.2.0")
                      .addBearerAuth()
                      .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
