import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'staging')
          .default('development'),
        PORT: Joi.number().default(3000),
        MONGO_DB_URL: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
