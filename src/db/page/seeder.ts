import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Page } from "./page.entity";

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "shop",
      password: "shop",
      database: "shop",
      entities: [Page],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Page])]
}).run([Page]);
