import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Version,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Pokemon } from './schemas/pokemon.schema';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @Version('1')
  create(
    @Body(new ValidationPipe()) createPokemonDto: CreatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @Version('1')
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id', new ParseIntPipe()) id: string): Promise<Pokemon> {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  @Version('1')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body(new ValidationPipe()) updatePokemonDto: UpdatePokemonDto,
  ): Promise<void> {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  @Version('1')
  remove(@Param('id', new ParseIntPipe()) id: string): Promise<void> {
    return this.pokemonService.remove(+id);
  }
}
