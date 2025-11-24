import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches, MinLength } from "class-validator"
import { CreateUserDto } from "../Users/UserDto/createUsersDto";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";



export class SingUp extends CreateUserDto {
    
    @ApiHideProperty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
    @MinLength(8)
    @ApiProperty({
        description:"Password de confirmación para la creación del usuario.",
        example: "!Example563#"
    })
    confirmPassword: string;
}
