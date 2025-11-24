import { Injectable } from "@nestjs/common";
import { repositoryOrder } from "./order.repository";
import { CreateOrderDto } from "./Dto/createOrderDto";




@Injectable()

export class serviceOrder {
    

    constructor (private readonly repository: repositoryOrder ){}



    getPurchase(id: string) {
     return  this.repository.getOrder(id)
    }

    addPurchase(dto: CreateOrderDto) {
        return this.repository.addOrder(dto)
    }

    async borrar(id: string) {
      return await this.repository.delete(id)
    }



}