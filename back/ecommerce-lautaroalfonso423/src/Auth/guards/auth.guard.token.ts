import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardToken implements CanActivate {
  
    constructor(private readonly JWT: JwtService){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

   const headersToken = request.headers["authorization"]
   
    if(!headersToken) throw new UnauthorizedException("Token no verificado")

    const token = headersToken.split(" ")[1];
    
    
    if(!token) throw new UnauthorizedException("Token no verificado")

       try {
            const secret = process.env.JWT_MODULE;
            const playload = this.JWT.verify(token, {secret})
            request.user= playload;
            return true
       } catch (error) {
        throw new UnauthorizedException("Token invalido")
       } 

  }
}

