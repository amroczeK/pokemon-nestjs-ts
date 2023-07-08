import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from './base.schema';
import { Name } from './name.schema';

@Schema()
export class Pokemon extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: Name;

  @Prop({ required: true })
  type: [string];

  @Prop({ required: true })
  base: Base;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
