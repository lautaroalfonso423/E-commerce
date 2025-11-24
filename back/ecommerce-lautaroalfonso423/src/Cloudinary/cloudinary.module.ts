import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryController } from "./cloudinary.controller";
import { ProductModule } from "../Products/product.module";


@Module({
    imports:[ProductModule],
    providers:[CloudinaryService],
    controllers:[CloudinaryController]
})

export class CloudinaryModule{}