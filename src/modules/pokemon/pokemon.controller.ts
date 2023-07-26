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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @Version('1')
  @ApiOperation({ summary: 'Write pokemon to database.' })
  @ApiResponse({ status: 201 })
  @ApiResponse({
    status: 409,
    description: 'A document with the same pokedex id already exists.',
  })
  create(
    @Body(new ValidationPipe()) createPokemonDto: CreatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @Version('1')
  @ApiResponse({ status: 200, type: [CreatePokemonDto] })
  @ApiOperation({ summary: 'Fetch all pokemon from database.' })
  findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Fetch pokemon by pokedex number from database.' })
  @ApiResponse({ status: 200, type: CreatePokemonDto })
  @ApiResponse({ status: 404, description: 'Pokemon not found.' })
  findOne(@Param('id', new ParseIntPipe()) id: string): Promise<Pokemon> {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Update base stats of pokemon by pokedex number in database.',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Pokemon not found.' })
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body(new ValidationPipe()) updatePokemonDto: UpdatePokemonDto,
  ): Promise<void> {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Delete pokemon by pokedex number from database.' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Pokemon not found.' })
  remove(@Param('id', new ParseIntPipe()) id: string): Promise<void> {
    return this.pokemonService.remove(+id);
  }
}
