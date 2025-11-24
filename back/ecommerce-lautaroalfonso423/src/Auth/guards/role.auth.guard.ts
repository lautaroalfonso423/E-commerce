import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "src/roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector){}

    canActivate(
            context: ExecutionContext
            ): boolean | Promise<boolean> | Observable<boolean> {

                const requireRoles = this.reflector.getAllAndOverride<Roles[]>("roles", [
                    context.getHandler(),
                    context.getClass()
                ])

                const request = context.switchToHttp().getRequest();

                const users = request.user;
                const hasRole = ()=> requireRoles.some((role) => users?.roles?.includes(role))
                const valid = users && users.roles && hasRole();

                if(!valid){
                    throw new ForbiddenException("No tienes permisos para acceder ah esta ruta")
                }

                return true


    } 
}