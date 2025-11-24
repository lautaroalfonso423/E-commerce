import { BadRequestException, Controller, FileTypeValidator, InternalServerErrorException, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { CloudinaryService } from "./cloudinary.service"
import { ProductRepository } from "../Products/product.repository"
import { AuthGuardToken } from "../Auth/guards/auth.guard.token";
import { Validate } from "class-validator";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { format } from "path";




@ApiTags("Modify Image")
@Controller()

export class CloudinaryController {

    constructor(
      private readonly clou: CloudinaryService,
      private readonly productRepo: ProductRepository
    
    ){}
  
   @ApiOperation({
      summary: "Modificar la imagen de un producto"
     })
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data") 
  @ApiBody({
    description: "Coloque la imagen para modificar el producto. La Imagen no debe ser mayor a 200kb",
    schema: {
      type: "object",
      properties: {
        image: {
         type: "string",
         format: "binary" 
        },
      },

    },
  })
  @Post("/files/uploadImage/:id")
  @UseGuards(AuthGuardToken)
    @UseInterceptors(FileInterceptor("image"))
    async cloudinaryImage(
      @Param("id")id:string, 
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({
              maxSize: 200000,
              message: "El archivo debe ser menor ah 200kb."
            }),
            new FileTypeValidator({
              fileType:/(jpg|jpeg|png|webp)$/,
            })
          ]
        })
      ) file: Express.Multer.File){
            
      try {


    const result = await this.clou.uploadImage(file);
    const updated = await this.productRepo.imageUrlProduct(id, result.secure_url);

    return { message: "Imagen actualizada"};
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error);
    throw new InternalServerErrorException("No se pudo subir la imagen");
  }
    }    
}
