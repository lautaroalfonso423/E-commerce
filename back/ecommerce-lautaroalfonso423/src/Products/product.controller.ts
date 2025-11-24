import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UploadedFile, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ServiceProduct } from "./product.service";
import { ProductDto } from "./ProductDto/createproductDto";
import { AuthGuard } from "../Auth/guards/auth.guard";
import { ValidationPipeMaxSize } from "../Pipes/min-size-validator.pipe";
import { AuthGuardToken } from "../Auth/guards/auth.guard.token";
import { RoleGuard } from "../Auth/guards/role.auth.guard";
import { Roles } from "../roles.enum";
import { Role } from "../Decorators/roles.decorator";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Product")
@Controller('product')
export class ControllerProduct{
        constructor(
            @InjectRepository(Product)
            private readonly productRepo: Repository<Product>,
            private readonly serviceProduct: ServiceProduct){}

    @ApiOperation({
    summary: "Ver los productos creados"
   })        
    @Get()
    @HttpCode(200)
    async getProduct(@Query("page") page = 1, @Query("limit" ) limit = 5) {
        return this.serviceProduct.getProduct(+page, +limit)
    }

   @ApiOperation({
    summary: "Iniciador de las categorias de los productos",
    description: "Se debe colocar el nombre de un producto, o alguna caracteristica del mismo. Varios productos pueden ser colocados, pero deben pertenecer a una misma categoria."
   })
    @Post("seeder")
    async getCategorieProduct(@Body() productList: ProductDto[]) {
    
        const categori = await this.serviceProduct.categoriProduct(productList)
        if(!categori){
            throw new NotFoundException("Hubo un error en las categorias del producto")
        }
        return categori;
    }


    
    @ApiOperation({
    summary: "Ver un producto en específico"
   }) 
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuardToken)
    @HttpCode(200)
    async productId(@Param("id", new ParseUUIDPipe()) id: string){
        const product = await this.serviceProduct.getProductById(id)
        if(!product){
            throw new NotFoundException("Error en los productos")
        }
        return product;
    }

    
    @ApiOperation({
    summary: "Crear un nuevo producto"
   }) 
    @Post()
    // @UseGuards(AuthGuard)
    @HttpCode(201)
    @UsePipes(
        new ValidationPipe({ whitelist: true }),
        ValidationPipeMaxSize
    )
    async createProduct(
    
        @Body() createProductDto: ProductDto){
        const product = await this.serviceProduct.productCreateService(createProductDto)
        if(!product){
            throw new NotFoundException("Error en la creacion de productos")
        }
        return {id: product.id}
}

     @ApiOperation({
    summary: "Modificar un producto existente",
    description:"Atención!. Este metodo solo esta disponible para los Administradores"
   })
    @ApiBearerAuth()
    @Put(":id")
    @UseGuards(AuthGuardToken, RoleGuard)
    @Role(Roles.Admin)
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async modifiedProduct(@Param("id", new ParseUUIDPipe()) id: string, @Body() createproductDto: ProductDto){
          console.log(createproductDto);
        const product = await this.serviceProduct.modifiedProductService(id, createproductDto);
        if(!product)throw new BadRequestException("El producto no se modifico")
        return {id: product.id}

    }

    @ApiOperation({
    summary: "Borrar un producto"
   })
    @Delete(":id")
    // @UseGuards(AuthGuard)
    @HttpCode(200)
    async deleteProduct(@Param("id") id: string){
        const removed = await this.serviceProduct.removedProduct(id)
        return {id: removed.id}
    }
}