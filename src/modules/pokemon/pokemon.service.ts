import { Model } from 'mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './schemas/pokemon.schema';
import { MongoServerError } from 'mongodb';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel('gen1') // Collection name
    private pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const createdPokemon = new this.pokemonModel(createPokemonDto);
      return await createdPokemon.save();
    } catch (error) {
      console.log(error);
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException(
          'A document with the same pokedex id already exists.',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonModel.find().sort({ id: 1 }).exec(); // Get all and sort ascending
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonModel.findOne({ id }).exec();

    if (!pokemon) throw new NotFoundException();

    return pokemon;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto): Promise<void> {
    const updatedPokemon = await this.pokemonModel
      .findOneAndUpdate({ id }, updatePokemonDto)
      .exec();

    if (!updatedPokemon) throw new NotFoundException();
  }

  async remove(id: number): Promise<void> {
    const deletedPokemon = await this.pokemonModel
      .findOneAndDelete({
        id,
      })
      .exec();

    if (!deletedPokemon) throw new NotFoundException();
  }
}
