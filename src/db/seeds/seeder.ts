import {DataFactory, Seeder} from "nestjs-seeder";
import {InjectRepository} from "@nestjs/typeorm";
import {Page} from "../page/page.entity";
import {Repository} from "typeorm";
import {UsersEntity} from "../users/users.entity";

export class PageSeeder implements Seeder {

	constructor(
			@InjectRepository(Page)
			private readonly pageRepository: Repository<Page>
	) {
	}

	drop(): Promise<any> {
		return this.pageRepository.delete({});
	}

	seed(): Promise<any> {
		const pages = DataFactory.createForClass(Page).generate(50);

		return this.pageRepository.insert(pages)
	}


}

