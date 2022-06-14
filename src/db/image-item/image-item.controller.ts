import {
  Body,
  CallHandler,
  Controller,
  Delete,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ImageItemService } from "./image-item.service";
import { CreateItemImageDto } from "./dto/create-item-image.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from "fs";
import { extname } from "path";
import { Observable } from "rxjs";
import { ItemsService } from "../items/items.service";

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file["itemId"] = Number(req.body.itemId);
    return next.handle();
  }
}

@ApiTags("ImageItem")
@Controller("image-item")
export class ImageItemController {
  constructor(private readonly imageItemService: ImageItemService,
              private readonly itemsService: ItemsService) {
  }

  static get basePath() {
    return __dirname + "/../../../uploads/";
  }

  static get endPath() {
    return '' + Math.round(Math.random() * 100);
  }

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file", {

    storage: diskStorage({
      destination: (req, file, callback) => {
        const endPath: string = ImageItemController.endPath;
        const path: string = ImageItemController.basePath + endPath;


        fs.exists(path, function(exists: boolean) {
          if (!exists) {
            fs.mkdirSync(path);
          }
          try {
            fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
            callback(null, './uploads/' + endPath);
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
        itemId: { type: "integer" },
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
  })

  async upload(@UploadedFile() file, @Body() data: CreateItemImageDto) {
    // const item =  await this.itemsService.findOne(data.itemId)
    //  if (!item){
    //      throw new Error('item is not exist')
    //  }

    return this.imageItemService.create({
      ...data,
      path: file.path
    });


  }

  create(@Body() createItemImageDto: CreateItemImageDto) {
    return this.imageItemService.create(createItemImageDto);


  }


  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imageItemService.remove(+id);
  }
}