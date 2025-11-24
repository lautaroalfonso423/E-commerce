import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/Users/UserDto/createUsersDto";
import { SingUp } from "./singup.dto";
import { UserRepository } from "../Users/users.repository";


@Injectable()

export class ServiceAuth{
    constructor(
        private readonly usersRepository: UserRepository

    ){}
  

      createAuth(userDto: SingUp) {
        const {confirmPassword, ...CreateUserDto} = userDto
        return this.usersRepository.create(CreateUserDto)
    }

}