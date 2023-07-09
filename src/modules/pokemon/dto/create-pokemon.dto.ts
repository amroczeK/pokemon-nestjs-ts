import {
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Name {
  @IsString()
  @ApiProperty()
  english: string;

  @IsString()
  @ApiProperty()
  japanese: string;

  @IsString()
  @ApiProperty()
  chinese: string;

  @IsString()
  @ApiProperty()
  french: string;
}

export class Base {
  @IsNumber()
  @ApiProperty()
  HP: number;

  @IsNumber()
  @ApiProperty()
  Attack: number;

  @IsNumber()
  @ApiProperty()
  Defense: number;

  @IsNumber()
  @ApiProperty()
  'Sp Attack': number;

  @IsNumber()
  @ApiProperty()
  'Sp Defense': number;

  @IsNumber()
  @ApiProperty()
  Speed: number;
}

export class CreatePokemonDto {
  @IsNumber()
  @ApiProperty({ description: 'Pokemons pokedex number.', example: 25 })
  id: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Name)
  @ApiProperty({
    description: 'Name of the pokemon in different languages.',
    example: {
      english: 'Pikachu',
      japanese: 'ピカチュウ',
      chinese: '皮卡丘',
      french: 'Pikachu',
    },
  })
  name: Name;

  @IsArray()
  @ApiProperty({
    description: 'Pokemons type.',
    example: ['Electric'],
  })
  type: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => Base)
  @ApiProperty({
    description: 'Pokemons base stats.',
    example: {
      HP: 35,
      Attack: 55,
      Defense: 40,
      'Sp Attack': 50,
      'Sp Defense': 50,
      Speed: 90,
    },
  })
  base: Base;
}
