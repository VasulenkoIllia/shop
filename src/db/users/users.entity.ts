import { Factory } from 'nestjs-seeder';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { faker } from '@faker-js/faker/locale/de';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GHOST = 'ghost',
}

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: string;
}
