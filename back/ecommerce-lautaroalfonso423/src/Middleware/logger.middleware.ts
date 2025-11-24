import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";



@Injectable()



export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        console.log(`Se ejecuta el metodo ${req.method} de ${req.url}`);
        next()
    }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction){
    const now = new Date().toISOString()
    console.log(`Se ejecuta el metodo ${req.method} de ${req.url} el día ${now}`);
    next()
}

