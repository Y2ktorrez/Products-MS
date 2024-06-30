import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsPositive()
  @IsNumber({
    maxDecimalPlaces: 4,
  })
  @Min(0)
  /* Lo Tranformamos en un Number */
  @Type(() => Number)
  public price: number;
}
