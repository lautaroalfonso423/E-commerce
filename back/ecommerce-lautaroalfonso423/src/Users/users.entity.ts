import { Order } from "../Order/order.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name:"users"
})


export class User {

    /**
     * Id para el usuario.  
     */ 
    @PrimaryGeneratedColumn("uuid")
    id: string;


    /**
     * Nombre del usuario, debe contener entre 3 y 10 caracteres.
     * 
     * @example: Ramirez Alfredo  
     */ 
    @Column({ length: 50, nullable: false })
    name: string;

    /**
    * Email del usuario.
    * 
    * @example: usuario@email.com 
    */ 
    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    /**
     * El password debe contener mínimo 8 caracteres y debe ser dificil de descifrar. 
     * 
     * @example: !Example563#  
     */ 
    @Column({ length: 80, nullable: false })
    password: string;

    /**
    * Numero de celular del usuario.
    * 
    * @example: 5656564
    */
    @Column({ type: "int", nullable: true })
    phone: number;

    /**
    * País donde se encuentra actualmente.
    * 
    * @example:Argentina  
    */
    @Column({ length: 50, nullable: true })
    country: string;

    /**
    * Dirección de vivienda donde actualmente se encuentra.
    * 
    * @example: Av. San Martin 352  
    */ 
    @Column({ type: 'text', nullable: true })
    address: string;

    /**
    * Ciudad donde se encuentra actualmente.
    * 
    * @example:Resistencia   
    */
    @Column({ length: 50, nullable: true })
    city: string;

    /**
    * Rol de usuario, por defecto: user. No debe ser incluido en el Body.
    */
    @Column({default: false})
    IsAdmin: boolean

    /**
    * Relación para cada orden de compra del usuario. 
    */
    @OneToMany(()=> Order, order => order.user_id)
    order_id: Order[];
   


}

