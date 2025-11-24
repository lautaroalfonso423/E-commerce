import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {  ProductDto } from "./ProductDto/createproductDto";
import { CategorieRepo } from "../Categories/categorie.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
import { ServiceProduct } from "./product.service";
// import * as data from "./../Data/archivoPersonalDePrueba.js"





@Injectable()

export class ProductRepository{

    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        private readonly cat: CategorieRepo,

    ){}


    async getProduct(page: number, limit: number){
        return this.productRepo.find({
            skip: (page - 1) * limit,
            take: limit
        }) 
    }

    async productId(id: string) {
        return this.productRepo.findOne({where: {id}})
    }

    async create(createProductDto: ProductDto) {
        const categoryCreate = await this.cat.findById(createProductDto.category);
        if(!categoryCreate)  throw new NotFoundException('Categoría no encontrada');

         if (!createProductDto.imgUrl || createProductDto.imgUrl.trim() === '') {
            createProductDto.imgUrl = "https://res.cloudinary.com/dtzqmvmtj/image/upload/v1747838315/fondo-blanco_23-2147730801_nsdaau.webp";
            }

        const newProduct = this.productRepo.create({
            ...createProductDto,
            category: categoryCreate,
        })

        return this.productRepo.save(newProduct);
    }



    async modified(id: string, createproductDto: ProductDto) {

        const {category} = createproductDto;

        if(!category) throw new NotFoundException("La Categoria es requerida")

    const Category_id = await this.cat.findById(category);
    if (!Category_id) {
    throw new NotFoundException('Categoría no encontrada');
    }

     const updateData = {
    ...createproductDto,
    category: Category_id, 
    };
     await this.productRepo.update(id, updateData)

    return  this.productRepo.findOne({where: {id}})

    }

    async delete(id: string) {
    const element = await this.productRepo.findOne({where: {id}})
    if(!element)  throw new NotFoundException("El elemento no fue encontrado")
        await this.productRepo.remove(element)
    return element
    }


    async initCategori(product: ProductDto[]) {
        const exist = await this.cat.getCategories();

        if(!exist || exist.length === 0) {
            throw new BadRequestException('Primero se deben cargar las categorías')
        }
        
        for(const data of product){

            
            try {
                
                const existingProduct = await this.productRepo.findOne({where: {name: data.name}})
                if(existingProduct)continue;
                
                    const categoria = await this.cat.findByName(data.category)
                    if(!categoria)continue
            
    
                    await this.create({
                        ...data,
                        category: categoria.id
                    })
                    
                } catch (error) {
                console.error(`Error al crear el producto ${data.name}`);
            }
            
        }
        return {message:"Productos cargados correctamente"};
        }
    
    
    

    async imageUrlProduct (productId:string, imgUrl:string){
        
        const url = await this.productRepo.findOne({where: {id: productId}})
        if(!url) throw new NotFoundException("Este porducto es inexistente")
        
        url.imgUrl = imgUrl;

        return this.productRepo.save(url)

        }


    
    
    

}

