import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../Users/users.entity";
import { OrderDetail } from "./orderDetail.entity";



@Entity({
name:"orders"    
})

export class Order {

    /**
     * Id de orden de compra del usuario.
     */
    @PrimaryGeneratedColumn("uuid")
    id: string

    /**
     * Id del usuario que realizo la orden.
     */
    @ManyToOne(()=> User, user => user.order_id, {onDelete: "CASCADE"})
    @JoinColumn()
    user_id:User;


    /**
     * Fecha y hora de la realización del pedido
     */
    @Column()
    date: Date

    /**
     * Detalles de la orden realizada.
     */
    @OneToOne(()=> OrderDetail)
    @JoinColumn()
    orderDetails: OrderDetail
   
}







