import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './db/page/page.entity';
import { PageHttpModule } from './db/page/page-http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'shop',
      password: 'shop',
      database: 'shop',
      entities: [Page],
      synchronize: true,
    }),
    PageHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
