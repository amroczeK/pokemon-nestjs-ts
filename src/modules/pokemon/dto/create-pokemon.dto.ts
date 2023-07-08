import {
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  IsArray,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Name {
  @IsString()
  english: string;

  @IsString()
  japanese: string;

  @IsString()
  chinese: string;

  @IsString()
  french: string;
}

export class Base {
  @IsNumber()
  HP: number;

  @IsNumber()
  Attack: number;

  @IsNumber()
  Defense: number;

  @IsNumber()
  'Sp. Attack': number;

  @IsNumber()
  'Sp. Defense': number;

  @IsNumber()
  Speed: number;
}

export class CreatePokemonDto {
  @IsNumber()
  id: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Name)
  name: Name;

  @IsArray()
  type: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => Base)
  base: Base;
}
