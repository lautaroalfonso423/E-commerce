import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString, IsUUID } from "class-validator";


export class ProductDto {
    
 

    @IsString()
    @ApiProperty({
        description: "Nombre del producto.",
        example: "Perfume de Hombre One Millon 50ml"
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: "Descripción general para cada producto.",
        example: "Descubre el cautivador Perfume Importado Paco Rabanne One Million..."
    })
    description: string;

    @IsNumber()
    @ApiProperty({
        description: "Precio de cada producto",
        example: "160.000"
    })
    price: number;

    @IsNumber()
    @ApiProperty({
        description: "Cantidad disponible de cada producto",
        example: "20"
    })
    stock: number;

    @IsString()
    @ApiProperty({
        description: "Imagen de muestra o ejemplo para el producto. Cada producto por defecto no lleva ninguna imagen."
    })
    imgUrl: string

    
    @IsUUID()
    @ApiProperty({
        description: "Categoria para cada producto",
        example: "{Id de la categoria}: Perfumes para Hombre"
    })
   category: string;

}



