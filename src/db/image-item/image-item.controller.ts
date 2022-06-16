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
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {ImageItemService} from "./image-item.service";
import {CreateItemImageDto} from "./dto/create-item-image.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {Observable} from "rxjs";
import {HelpersService} from "../helpers/helpers.service";

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
    constructor(private readonly imageItemService: ImageItemService) {
    }

    @Post("upload")
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor("file", {

        storage: diskStorage({
            destination: (req, file, callback) => {
                const endPath: string = HelpersService.endPath;
                const path: string = HelpersService.basePath + endPath;
                HelpersService.checkAndCreateFolder(path)
                callback(null, './uploads/' + endPath);
            },
            filename: (req, file, callback) => {
                try {
                    const name = HelpersService.createImageName(req,file);
                    callback(null, name)
                } catch (e) {
                    callback(e, '')
                }

            }
        })
    }))

    @ApiBody({
        schema: {
            type: "object",
            properties: {
                itemId: {type: "integer"},
                file: {
                    type: "string",
                    format: "binary"
                }
            }
        }
    })

    async upload(@UploadedFile() file, @Body() data: CreateItemImageDto) {
        const path = file.path
        return this.imageItemService.create({
            ...data,
            path
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