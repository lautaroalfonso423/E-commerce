import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ControllerAuth } from "./auth.controller";
import { ServiceAuth } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { UserRepository } from "../Users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../Users/users.entity";
import { Order } from "src/Order/order.entity";




@Module({
    imports:[TypeOrmModule.forFeature([User, Order])],
    controllers:[ControllerAuth],
    providers:[ServiceAuth, AuthGuard, UserRepository]

})

export class  AutchModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
    
     }
    
}

