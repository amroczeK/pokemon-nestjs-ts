import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Name extends Document {
  @Prop({ required: true })
  english: string;

  @Prop({ required: true })
  japanese: string;

  @Prop({ required: true })
  chinese: string;

  @Prop({ required: true })
  french: string;
}

export const NameSchema = SchemaFactory.createForClass(Name);
