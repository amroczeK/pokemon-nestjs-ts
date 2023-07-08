import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
  imports: [PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
