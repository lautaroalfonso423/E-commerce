import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../Products/product.entity";
import { Order } from "./order.entity";






@Entity({
    name: "orderDetails"
})

export class OrderDetail {

    /**
     * Id del detalle de la orden.
     */
    @PrimaryGeneratedColumn("uuid")
    id:string;

    /**
     * Precio total de las ordenes.
     */
    @Column({
        type:"decimal",
        precision:10,
        scale:2,
        nullable: false
    })
    price: number;


    /**
     * Id de cada orden realizada.
     */
    @OneToOne(()=> Order, order => order.orderDetails)
    @JoinColumn()
    order_id: Order

    /**
     * Id de los productos pedidos en la orden.
     */
    @ManyToMany(()=> Product, product => product.orderDetails)
    @JoinTable()
    products: Product[];
    

}





