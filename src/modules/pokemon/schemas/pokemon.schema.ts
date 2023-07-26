import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from './base.schema';
import { Name } from './name.schema';

@Schema()
export class Pokemon extends Document {
  // 'id' is the Pokemon Pokedex number which is unique
  // This will prevent a document being saved with the same pokedex number
  @Prop({ required: true, index: true, unique: true })
  id: number;

  @Prop({ required: true })
  name: Name;

  @Prop({ required: true })
  type: [string];

  @Prop({ required: true })
  base: Base;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
