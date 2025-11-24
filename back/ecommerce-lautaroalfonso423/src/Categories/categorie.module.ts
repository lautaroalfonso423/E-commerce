import { Module } from "@nestjs/common";
import { CategorieController } from "./categorie.controller";
import { CategorieService } from "./categorie.service";
import { CategorieRepo } from "./categorie.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categorie } from "./categories.entity";



@Module({
    imports: [TypeOrmModule.forFeature([Categorie])],
    controllers: [CategorieController],
    providers: [CategorieService, CategorieRepo],
    exports: [CategorieRepo]
})

export class CategorieModule {}