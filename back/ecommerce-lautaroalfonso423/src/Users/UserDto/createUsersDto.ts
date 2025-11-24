import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches, MinLength } from "class-validator"
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger";



export class CreateUserDto {

    @Length(3, 80)
    @IsNotEmpty()
    @ApiProperty({
        description:"Nombre de usuario, de 3 a 10 caracteres minimos.",
        example:"Ramirez Alfredo"
    })
    name: string;

    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description:"Email del usuario.",
        example:"usuario@email.com"
    })
    email: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
    @MinLength(8)
    @ApiProperty({
        description:"El password debe ser de mínimo 8 caracteres. Debe contener caracteres especiales.",
        example:"!Example563#"
    })
    password: string;

    
    @IsString()
    @Length(3, 80)
    @ApiProperty({
        description:"Dirección de vivienda donde actualmente se encuentra.",
        example:"Av. San Martin 352  "
    })
    address: string;

      
    @IsNumber()
    @ApiProperty({
        description:"Numero de celular del usuario.",
        example: 5656564,
    })
    phone: number;
 
    @IsString()
    @Length(5, 20)
    @ApiProperty({
        description:"País donde se encuentra actualmente.",
        example:"Argentina"
    })
    country: string;

    @IsString()
    @Length(5, 20)
    @ApiProperty({
        description:"Ciudad donde se encuentra actualmente.",
        example:"Resistencia"
    })
    city: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto){}


