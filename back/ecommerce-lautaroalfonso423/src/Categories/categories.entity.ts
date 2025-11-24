import { Product } from "../Products/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity({
    name: "categories"
})

export class Categorie {

    /**
     * Id de cada categoria.
     */
    @PrimaryGeneratedColumn("uuid")
    id:string

    /**
    * Nombre para cada categoria.
    *
    *@example: Zapatos para Hombre/ Perfumes AVON de mujer  
    */
    @Column({
        nullable: false,
        length:50
    })
    name:string

    /**
     * Productos que corresponden ah la categoria asignada.
     */
    @OneToMany(()=> Product, product => product.category)
    products: Product[]

}




