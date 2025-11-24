import { Injectable } from "@nestjs/common";
import { CategorieRepo } from "./categorie.repository";
import { Categorie } from "./categories.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()

export class CategorieService{

  
    constructor(
       @InjectRepository(Categorie)
          private readonly repo : Repository<Categorie>,
      private readonly categorieRepository: CategorieRepo
    ){}

    async serviceCreacion(categorias: Categorie[]) {
        
        for(const as of categorias){
           if(!as.name || typeof as.name !== 'string' || as.name.trim() === '') continue;

          const exist = await this.categorieRepository.findByName(as.name)
          if(!exist)  await this.categorieRepository.addCategories(categorias);
         }
      
    
    
    return this.categorieRepository.getCategories()
    }

    

}