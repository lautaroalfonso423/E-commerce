import { Body, Controller, Get, NotFoundException, Post } from "@nestjs/common";
import { CategorieService } from "./categorie.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Categorie } from "./categories.entity";
import { Repository } from "typeorm";
import { ApiOperation, ApiTags } from "@nestjs/swagger";



@ApiTags("Categories")
@Controller("categories")

export class CategorieController {

    constructor(
           @InjectRepository(Categorie)
                  private readonly repo : Repository<Categorie>,
        private readonly categorieService: CategorieService

    ){}
    @ApiOperation({
        summary: "Ver las categorias de los productos",
        description: "Se debe colocar el o los nombres de las categorias a ejecutar"
    })
    @Post("seeder")
    async getCategories(@Body() categorias: Categorie[]){
        const cat = await this.categorieService.serviceCreacion(categorias)
        if(!cat){
            throw new NotFoundException("Error en la seccion categorias")
        }  
        return cat;  
    }

}