import * as fs from "fs";
import {extname} from "path";

export class HelpersService {

    static get basePath() {
        return __dirname + "/../../../uploads/";
    }

    static get basePathToUnlinc() {
        return __dirname + "/../../../";
    }

    static get endPath() {
        return Math.round(Math.random() * 100).toString();
    }

    static checkAndCreateFolder(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
    }

    static createFileName(req, file, func) {
        if (![".jpg", ".jpeg", ".png", ".gif", ".jfif"].includes(extname(file.originalname))) {
            func(new Error("it is not photo"), "");
            return;
        }
        const randomName = Array(5).fill(null).map(() =>
            (Math.round(Math.random() * 5)).toString(5)).join("");
        func(null, `${randomName}${extname(file.originalname)}`);
    }
}