import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Base extends Document {
  @Prop({ required: true })
  HP: number;

  @Prop({ required: true })
  Attack: number;

  @Prop({ required: true })
  Defense: number;

  @Prop({ required: true })
  'Sp Attack': number;

  @Prop({ required: true })
  'Sp Defense': number;

  @Prop({ required: true })
  Speed: number;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
