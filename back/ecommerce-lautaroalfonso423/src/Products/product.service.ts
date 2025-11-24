import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { ProductDto } from "./ProductDto/createproductDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";



@Injectable()

export class ServiceProduct {
    
    constructor(
        @InjectRepository(Product)
            private readonly productRepo: Repository<Product>,
        private readonly productRepository: ProductRepository) {}
        
    getProduct(page: number, limit: number){
        return this.productRepository.getProduct(page, limit);
    }

    getProductById(id: string) {
    return this.productRepository.productId(id)       
    }

    productCreateService(createProductDto: ProductDto) {
        return this.productRepository.create(createProductDto)
    }

    modifiedProductService(id: string, createproductDto: ProductDto) {
       return this.productRepository.modified(id, createproductDto)
    }

    removedProduct(id: string) {
       return this.productRepository.delete(id)
    }

    categoriProduct(productList: ProductDto[]) {
        return this.productRepository.initCategori(productList)
    }
     
    
}