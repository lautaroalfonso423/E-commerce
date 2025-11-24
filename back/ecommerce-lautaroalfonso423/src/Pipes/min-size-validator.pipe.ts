import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()


export class  ValidationPipeMaxSize implements PipeTransform{

    transform(value: any, metadata: ArgumentMetadata) {
        const maxSize = 200000;
        
        if(value.size > maxSize){
            throw new BadRequestException("El tamaño del archivo es mayor a lo permitido.")
        }

    return value



    }


}