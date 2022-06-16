import * as fs from "fs";
import {extname} from "path";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';

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

    static createImageName(req, file) {
        if (![".jpg", ".jpeg", ".png", ".gif", ".jfif"].includes(extname(file.originalname))) {
            throw new Error("it is not photo");
        }
        const randomName = Array(5).fill(null).map(() =>
            (Math.round(Math.random() * 5)).toString(5)).join("");
        return `${randomName}${extname(file.originalname)}`;
    }

    static async checkTransmittedData(repository: Repository<any>, id): Promise<void> {
        const data = await repository.findOne(id);
        if (!data) {
            throw new Error('Record by ID#' + id + ' do not found');
        }
    }

    static async hashData(data: string) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt)
    }

    static checkHashData(hash, data): Promise<boolean> {
        return bcrypt.compare(data, hash);
    }

}