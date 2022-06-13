import {
  CallHandler,
  Controller,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PhotoService } from "./photo.service";
import { diskStorage } from "multer";
import { extname } from "path";
import * as fs from "fs";
import {Observable} from "rxjs";

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['itemId'] = Number(req.body.itemId);
    return next.handle();
  }
}

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

        fs.exists(path, function(exists:boolean) {
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
        if (![".jpg", ".jpeg", ".png", ".gif", ".jfif"].includes(extname(file.originalname))) {
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
        itemId: { type: 'integer' },
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
  })



  async upload(@UploadedFile() file) {
    // console.log(file);
    console.log(file.itemId);


  }
}
