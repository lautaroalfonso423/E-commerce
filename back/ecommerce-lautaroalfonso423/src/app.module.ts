import { Module } from '@nestjs/common';
import { UserModule } from './Users/users.module';
import { ProductModule } from './Products/product.module';
import { AutchModule } from './Auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from "./Config/databaseConfig"
import { CategorieModule } from './Categories/categorie.module';
import { OrderModule } from './Order/order.module';
import { CloudinaryModule } from './Cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
 

  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[databaseConfig]
    }),

    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const config =  configService.get('typeorm')
      if (!config) {
        throw new Error('❌ No se encontró la configuración "typeorm"');
      }
      return config;
    },
    }),
    JwtModule.register({
      global:true,
      signOptions: {expiresIn: "1h"},
      secret: process.env.JWT_MODULE
    }),


    UserModule, ProductModule, AutchModule, CategorieModule, OrderModule, CloudinaryModule],
    controllers: [],
    providers: [],
})
export class AppModule  {}
