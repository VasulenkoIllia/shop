import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { faker } from '@faker-js/faker/locale/de';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Factory((faker) => faker.lorem.words(2))
  @Column({ length: 500 })
  title: string;

  @Factory((faker) => faker.lorem.words(10))
  @Column('text')
  description: string;
}
