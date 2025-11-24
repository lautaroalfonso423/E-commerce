import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body, Query, UseGuards, ParseUUIDPipe, UsePipes, ValidationPipe, NotFoundException, BadRequestException, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ServiceUsers } from "./users.service";
import {CreateUserDto, UpdateUserDto} from "./UserDto/createUsersDto";
import { UserRepository } from "./users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AuthGuardToken } from "../Auth/guards/auth.guard.token";
import { Roles } from "../roles.enum";
import { RoleGuard } from "../Auth/guards/role.auth.guard";
import { Role } from "../Decorators/roles.decorator";
import { Throttle } from "@nestjs/throttler";
import { Request } from "express";
import { LoginUserDto } from "./UserDto/LoginUserDto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags("User")
@Controller('users')
export class ControllerUsers{
    constructor(
        private readonly  serviceUsers: ServiceUsers,
        private readonly  userRepository: UserRepository,
        private readonly JWT: JwtService
       
    ){}

     @ApiOperation({
        summary: "Ver los usuarios existentes",
        description:"Atención!. Este metodo solo esta disponible para los Administradores"
       })
    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuardToken, RoleGuard)
    @Role(Roles.Admin)
    @HttpCode(200)
    async getUsers(@Query("page") page = 1, @Query("limit") limit = 5){
        const user = await this.serviceUsers.getUsers(+page, +limit);
        if(!user){
            throw new NotFoundException("Error en los usuarios")
        }
        return user.map(({password, IsAdmin, ...reset})=> reset)
    }


    @ApiOperation({
    summary: "Ver a un usuario en específico"
    })
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuardToken)
    @HttpCode(200)
    async usersId(@Param("id", new ParseUUIDPipe()) id: string){
        const user = await this.serviceUsers.getUsersById(id)
        if(!user) {
            throw new NotFoundException("El usuario con ese id no existe")
        }
        return user;
    }
    
     @ApiOperation({
    summary: "Editar usuario"
   })
    @ApiBearerAuth()
    @Put(":id")
    @UseGuards(AuthGuardToken)
    @HttpCode(200)
    @UsePipes(new ValidationPipe({whitelist: true}))
    async modifiedUser(@Param("id", new ParseUUIDPipe()) id: string, @Body() updateUser: CreateUserDto){

        const update = await this.serviceUsers.modifiedUsers(id, updateUser)
        if(!update){
            throw new NotFoundException("Error en la modificacion del usuario")
        }

        return {id: update.id}
        
       }


    @ApiOperation({
    summary: "Borrar un usuario"
   })   
    @ApiBearerAuth()
    @Delete(":id")
    @UseGuards(AuthGuardToken)
    @HttpCode(200)
    async deleteUser(@Param("id") id: string){
        
        const removedUser = await this.serviceUsers.deleteService(id)

        return {id: removedUser.id}
       }
   
        @ApiOperation({
    summary: "Metodo de inicio de seción"
   })
        @Post("/auth/signin")
        @Throttle({default: {ttl: 60, limit: 10}})
        @UsePipes(new ValidationPipe({whitelist: true}))
        async userLogin (@Body() userLoginDto: LoginUserDto) {
            
            const {email, password} = userLoginDto
            
            if(!email || !password) throw new NotFoundException("Faltan datos")
                
                const login = await this.userRepository.findOneEmail(email)
                
                if(!login){
                    throw new NotFoundException("Email o password incorrectos");
                }
                
                const CofiedPass = await bcrypt.compare(password, login.password)
                if(!CofiedPass){
                    throw new NotFoundException("Email o password incorrectos");
                }
                const userPaylod = {
                    id: login.id,
                    email: login.email,
                    roles: [login.IsAdmin ? Roles.Admin : Roles.User]
                }
                
                const token = this.JWT.sign(userPaylod,{
                    secret: process.env.JWT_MODULE
                })
                
                return {message: "Login exitoso", token};
            }
            
            
    
    }











