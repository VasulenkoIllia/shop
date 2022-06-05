import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PhotoService } from "./photo.service";

@Controller("photo")
@ApiTags("photo")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
