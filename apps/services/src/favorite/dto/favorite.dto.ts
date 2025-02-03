import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  recipe_id: number;
}
