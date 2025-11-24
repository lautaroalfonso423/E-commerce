import { Injectable, NotFoundException } from "@nestjs/common";
import {CreateUserDto, UpdateUserDto} from "./UserDto/createUsersDto";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Order } from "../Order/order.entity";



@Injectable()

export class UserRepository {
   
   constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository< User>,
    // @InjectRepository(Order)
    // private readonly orderRepo: Repository< Order>

    ){}


    async getUsers(page: number, limit: number){
        return this.userRepo.find({
            skip: (page - 1) * limit,
            take: limit
        })
    }


    async findOne(id: string) {
        const user = await this.userRepo.findOne({
        where: { id },
        relations: ['order_id'], 
    });

        if (!user)  throw new NotFoundException('Usuario no encontrado');

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone,
        country: user.country,
        city: user.city,
        IsAdmin: user.IsAdmin,
        orders: user.order_id.map(order => ({
            id: order.id,
            date: order.date,
        })),
    };

    }

    async create(userDto: CreateUserDto) {
         
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const userToCreate = {
        ...userDto,
        password: hashedPassword,
    };
       const newUser = this.userRepo.create(userToCreate);

       const resetPass = await this.userRepo.save(newUser);
       const {password, ...result} = resetPass
       return result;
        
    }


    async modified(id: string, updateUser: CreateUserDto) {
    
    const user = await this.userRepo.findOne({where:{id}})
        if(!user)  throw new NotFoundException("EL usuario ah modificar no existe");

        if(updateUser.password){
        const hashedPassword = await bcrypt.hash(updateUser.password, 10)
            updateUser.password= hashedPassword
        }
   

        const modifi = this.userRepo.merge(user, updateUser)
        return await this.userRepo.save(modifi);
    }


    async removed(id: string) {
     const userRemove = await this.userRepo.findOne({where: {id}});
     if(!userRemove)  throw new NotFoundException("No se encontro ningun usuario")
    // await this.orderRepo.delete({user_id: {id}}) 
    await this.userRepo.delete(id);
    return userRemove;

    }

    findOneEmail(email: string) {
        return this.userRepo.findOne({where:{email}})
    }

}

 