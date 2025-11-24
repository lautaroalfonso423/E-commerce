import { CanActivate, ExecutionContext, Header, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserRepository } from "../../Users/users.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly userRepo: UserRepository){}

      async canActivate(context: ExecutionContext): Promise<boolean> {
       const request = context.switchToHttp().getRequest()

    const authHeader = request.headers["authorization"]
    if(!authHeader) return false;
    if(!authHeader.startsWith("Basic ")) return false
    const credentials = authHeader.replace("Basic ",'').trim();
    let decodeCredencial: string;

        try {

            decodeCredencial = Buffer.from(credentials, "base64").toString("utf-8");
            
        } catch (error) {
            return false
        }

    const [email, password] = decodeCredencial.split(':');
    if (!email || !password){
        return false;
        }

        const user = await this.userRepo.findOneEmail(email)
        if(!user)return false;


        const passCoding = await bcrypt.compare(password, user.password); 
        if(!passCoding) {
             console.warn("Contraseña incorrecta");
            return false;
        }


        return true;


    }
}
