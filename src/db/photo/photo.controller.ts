import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PhotoService } from "./photo.service";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("photo")
@ApiTags("photo")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {
  }

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file", {

    storage: diskStorage({
      destination: "./uploads"
      , filename: (req, file, func) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          console.log(`it is not photo`);
          return;
        }
        const randomName = Array(5).fill(null).map(() =>
          (Math.round(Math.random() * 5)).toString(5)).join("");
        func(null, `${randomName}${extname(file.originalname)}`);
      }
    })
  }))
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
  async upload(@UploadedFile() file) {
    console.log(file);
  }
}
