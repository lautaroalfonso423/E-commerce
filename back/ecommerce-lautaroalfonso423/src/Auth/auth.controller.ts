import { BadRequestException, Body, Controller, Get, HttpCode, NotAcceptableException, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ServiceAuth } from "./auth.service";
import { CreateUserDto } from "src/Users/UserDto/createUsersDto";
import { SingUp } from "./singup.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags("User Register")
@Controller('auth')
export class ControllerAuth{
    constructor(private readonly serviceAuth: ServiceAuth){}

      @ApiOperation({
            summary: "Registro de datos para la creación de usuarios"
           })
      @Post('signup')
        @HttpCode(201)
        @UsePipes(new ValidationPipe({whitelist: true}))
        async createUser(@Body() userDto: SingUp){
         
            if(userDto.password !== userDto.confirmPassword)throw new NotAcceptableException("Las contraseñas no coinciden")
            
            const users = await this.serviceAuth.createAuth(userDto)

        if(!users)throw new BadRequestException("Error en la creacion de usuarios")
    
            return users;
    }
        
    }

