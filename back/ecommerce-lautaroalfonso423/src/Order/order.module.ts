import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { Product } from "../Products/product.entity";
import { User } from "../Users/users.entity";
import { OrderDetail } from "./orderDetail.entity";
import { OrderController } from "./order.controller";
import { serviceOrder } from "./order.service";
import { repositoryOrder } from "./order.repository";




@Module({
    imports:[TypeOrmModule.forFeature([Order, Product, User, OrderDetail])],
    controllers: [OrderController],
    providers: [serviceOrder, repositoryOrder]
})

export class OrderModule{}