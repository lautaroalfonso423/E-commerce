
import {
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsNotEmpty
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';



export class CreateOrderProductDto {
 
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description:"Id del usuario a realizar la orden."
  })
  user_id: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description:"Cantidad de productos a pedir, con su respectivo Id",
    example: [ "{ productId: Id }" ]
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];

}