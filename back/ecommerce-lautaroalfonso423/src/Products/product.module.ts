import { Module } from "@nestjs/common";
import { ControllerProduct } from "./product.controller";
import { ServiceProduct } from "./product.service";
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { CategorieModule } from "../Categories/categorie.module";
import { UserModule } from "../Users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Product]),
    CategorieModule,
    UserModule
],
    controllers:[ControllerProduct],
    providers:[ServiceProduct, ProductRepository],
    exports:[ProductRepository]
})

export class ProductModule{}