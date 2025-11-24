import { Injectable } from "@nestjs/common";
import { Categorie } from "./categories.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()

export class CategorieRepo {
    
   constructor(
    @InjectRepository(Categorie)
    private readonly repo : Repository<Categorie>
){}


    async getCategories() {
    return this.repo.find();
    }

    async addCategories(cat: Categorie[]) {
            const newRepo = this.repo.create(cat)
            return this.repo.save(newRepo)
    }

     async findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }

    async findById(id: string) {
    return this.repo.findOne({ where: { id} });
  }

}