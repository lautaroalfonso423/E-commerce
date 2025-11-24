import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";





export class LoginUserDto {


     
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
    @MinLength(8)
    @ApiProperty({
        description:"Password de confirmacion para el inicio de seción.",
        example:"!Example563#"
    })
    password: string;

    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: "Email de confirmacion para el inicio de seción",
        example: "usuario@email.com"
    })
    email: string;


}