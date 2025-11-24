import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from "@nestjs/common";
import { ControllerUsers } from "./users.controller";
import { ServiceUsers } from "./users.service";
import { LoggerMiddleware} from "../Middleware/logger.middleware";
import { UserRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { ThrottlerModule } from "@nestjs/throttler";
import { Order } from "../Order/order.entity";



@Module({
    imports: [
        TypeOrmModule.forFeature([User, Order]),
        ThrottlerModule.forRoot({
            throttlers: [
                {
                  
                    ttl: 60,
                    limit: 10
                },
            ],
        }),
    ],
    controllers: [ControllerUsers],
    providers: [ServiceUsers, UserRepository],
    exports:[UserRepository]
})


export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(LoggerMiddleware)
        .forRoutes("users")
        
    }
   
    
}