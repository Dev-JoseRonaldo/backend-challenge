import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  author: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @Column()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  year: number;

  @Column()
  @IsInt()
  @Min(0)
  stock: number;
}
