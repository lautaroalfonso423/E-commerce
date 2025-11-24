import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "../Order/orderDetail.entity";
import { Categorie } from "../Categories/categories.entity";




@Entity({
    name: "products"
})

export class Product{

    /**
     * Id para los productos.
     */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * Nombre para cada producto.
     * 
     * @example: Tarjeta gráfica Nvidia GeForce RTX 5090 32gb
     */
    @Column({
        nullable: false,
        length: 50
    })
    name:string;
   
    /**
     * Descripciones generales que se le pueden hacer al producto.
     * 
     * @example: Dispositivo altamente eficaz con su nueva tecnologia que complementa la 
     * IA para procesos de lectura aun mayor y para un mejor renderizado de imagen...
     */
    @Column({
        type: "text",
        nullable: false
    })
    description: string;


    /**
     * Precio del producto.
     * 
     * @example: 3.000.000
     */
    @Column({
        nullable: false,
        type:"decimal",
        precision: 10,
        scale: 2
    })
    price: number;


    /**
     * Unidades disponibles del producto.
     * 
     * @example: 10
     */
    @Column({
        type:"int",
        nullable: false
    })
    stock: number;


    /**
     * Imagen de muestra o ejemplo para el producto. Cada producto por defecto no lleva ninguna imagen.
     * 
     */
    @Column({
        type:"text",
        default:"https://res.cloudinary.com/dtzqmvmtj/image/upload/v1747838315/fondo-blanco_23-2147730801_nsdaau.webp"
    })
    imgUrl: string;

    /**
     * Categoria en la que se encuentra cada producto.
     * 
     * @example: Tarjetas gráficas/ Placas de video
     */
    @ManyToOne(()=> Categorie, categorie => categorie.products)
    @JoinColumn()
    category: Categorie;

    /**
     * Si se realizo un pedido se muestra los detalles de la orden.
     */
    @ManyToMany(()=>OrderDetail, orderDetail => orderDetail.products)
    orderDetails: OrderDetail[];

}


