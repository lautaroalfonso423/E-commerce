import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService, registerAs } from '@nestjs/config';
// import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './envs';
import { configDotenv } from 'dotenv';


configDotenv({path: ".env.development"})



      const config = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: true,
        autoLoadEntities:true,
        migrations: ["dist/migrations/*.js"],
      }
  
    




export default registerAs("typeorm", () => config)

export const conectionSource = new DataSource(config as DataSourceOptions)


