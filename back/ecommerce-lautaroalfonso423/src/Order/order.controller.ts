import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { serviceOrder } from "./order.service";
import { CreateOrderDto } from "./Dto/createOrderDto";
import { AuthGuardToken } from "../Auth/guards/auth.guard.token";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";



@ApiTags("Order")
@Controller("orders")

export class OrderController {

    constructor(private readonly service: serviceOrder){}    

     @ApiOperation({
        summary: "Ver la orden creada",
        description:"Colocar el id de la orden que creo. No del usuario."
       })
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuardToken)
    async listOrder(@Param('id', new ParseUUIDPipe()) id: string){
      const order = await this.service.getPurchase(id);
      if(!order){
        throw new NotFoundException("Error en la lista")
      }
      return order
    }

     @ApiOperation({
    summary: "Crear una orden"
   })
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuardToken)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async purchaseOrder(@Req() req: Request, @Body() dtoOrders: CreateOrderDto){
    
      const order = await this.service.addPurchase(dtoOrders);
      if(!order) throw new NotFoundException("Error en la creacion de listas")
      return order;

    }


    @Delete(":id")
    async borrarOrder (@Param("id", new ParseUUIDPipe()) id:string) {
      return await this.service.borrar(id)
    }




}