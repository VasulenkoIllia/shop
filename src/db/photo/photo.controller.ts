import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PhotoService } from "./photo.service";
import { diskStorage } from "multer";
import { extname } from "path";
import * as fs from "fs";

@Controller("photo")
@ApiTags("photo")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {
  }

  static get basePath() {
    return __dirname + "/../../../uploads/";
  }

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file", {

    storage: diskStorage({
      destination: (req, file, callback) => {
        const path = PhotoController.basePath + Math.round(Math.random() * 100);

        fs.exists(path, function(exists) {
          if (!exists) {
            fs.mkdirSync(path);
          }
          try {
            fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
            callback(null, path);
          } catch (e) {
            callback(new Error("access do not have"), path);
          }
        });
      },
      filename: (req, file, func) => {
        if (![".jpg", ".jpeg", ".png", ".gif"].includes(extname(file.originalname))) {
          func(new Error("it is not photo"), "");
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
