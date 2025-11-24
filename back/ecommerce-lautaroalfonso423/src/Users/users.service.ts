import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { UpdateUserDto, CreateUserDto} from "./UserDto/createUsersDto";
import { DeleteResult } from "typeorm";

@Injectable()

export class ServiceUsers {
    
  
    
    
    constructor(private userRepository: UserRepository){}

    
    
    async getUsers(page: number, limit: number){
        return await this.userRepository.getUsers(page, limit);
    }

    async getUsersById(id: string) {
        return await this.userRepository.findOne(id)

        }

    async modifiedUsers(id: string , updateUser: CreateUserDto) {
        return await this.userRepository.modified(id, updateUser)
    }

    async deleteService(id: string) {
        return await this.userRepository.removed(id)    
    }
    
     //  async  createUser(userDto: CreateUserDto) {
    //     return this.userRepository.create(userDto)
    // }
   
}



