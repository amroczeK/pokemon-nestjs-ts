import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Pokemon } from './schemas/pokemon.schema';
import { plainToClass } from 'class-transformer';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createPokemonDto: CreatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string): Promise<Pokemon> {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body(new ValidationPipe()) updatePokemonDto: UpdatePokemonDto,
  ): Promise<void> {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: string): Promise<void> {
    return this.pokemonService.remove(+id);
  }
}
