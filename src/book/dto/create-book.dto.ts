import { IsString, IsInt, IsPositive, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(1, { message: 'O título é obrigatório' })
  title: string;

  @IsString()
  @MinLength(1, { message: 'O autor é obrigatório' })
  author: string;

  @IsString()
  @MinLength(1, { message: 'O gênero é obrigatório' })
  genre: string;

  @IsInt()
  @IsPositive({ message: 'O ano de publicação deve ser um número positivo' })
  year: number;

  @IsInt()
  @IsPositive({
    message: 'A quantidade em estoque deve ser um número positivo',
  })
  stock: number;
}
