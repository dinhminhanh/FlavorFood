import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class UpdateStoreIngredientDto {
  @ApiProperty({ description: 'The price of the ingredient', required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'The title/name of the ingredient', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The quantity of the ingredient in stock', required: false })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ description: 'The store ID this ingredient belongs to', required: false })
  @IsNumber()
  @IsOptional()
  store_id?: number;
}
