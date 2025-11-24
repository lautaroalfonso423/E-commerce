import { Injectable, NotFoundException } from "@nestjs/common";
import { Order } from "./order.entity";
import { In, MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetail } from "./orderDetail.entity";
import { Product } from "../Products/product.entity";
import { User } from "../Users/users.entity";
import { CreateOrderDto } from "./Dto/createOrderDto";



@Injectable()

export class repositoryOrder {
    
    
    constructor(
        @InjectRepository(Order)
        private readonly orders: Repository< Order>,

        @InjectRepository(OrderDetail)
        private readonly orderDetail: Repository<OrderDetail>,

        @InjectRepository(Product)
        private readonly productRepo:Repository<Product>, 

        @InjectRepository(User)
        private readonly userRepo:Repository<User> 
    ){}
    
    
    async addOrder(dto: CreateOrderDto){

        
        const user = await this.userRepo.findOne({where: {id: dto.user_id}})
        console.log(dto.user_id);
        if(!user) throw new Error("El usuario no existe");
        
        const productIds = dto.products.map(p => p.productId)
        const products = await this.productRepo.find({
            where: {
                id: In(productIds),
                stock: MoreThan(0)
            }
        });
        
        
        if(products.length === 0) throw new Error("No hay productos con stock disponible");
        
        let total = 0
        for(const product of products){
            if(product.stock < 1) continue;
            total += Number(product.price);
            product.stock -= 1;
            await this.productRepo.save(product);
        }
        
        
        const detail = this.orderDetail.create({
            price: total,
            products: products,
        })
        
        await this.orderDetail.save(detail);
        
        
        const order = this.orders.create({
            user_id: user,
            date: new Date(),
            orderDetails: detail
        })
        await this.orders.save(order)
        
        
        return order;
    }
    
    async getOrder(id: string) {
            const order = await this.orders.findOne({
                where:{id},
                relations: ["user_id", "orderDetails", "orderDetails.products"]
            })
            if(!order) throw new Error("La orden no existe")

            return {
                id: order.id,
                date: order.date,
                user: {
                    id: order.user_id.id,
                    email: order.user_id.email
                },
                detail: {
                    id:order.orderDetails.id,
                    price: order.orderDetails.price,
                    product: order.orderDetails.products.map(p=>({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        stock: p.stock,
                    })),
                }


            } 


    }


    async delete(id: string) {
        const order = await this.orders.findOneBy({id: id})

        if(!order) throw new NotFoundException("La orden especificada no existe")



        return await this.orders.remove(order)

    }
}