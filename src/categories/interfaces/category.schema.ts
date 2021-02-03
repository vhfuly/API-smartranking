import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Player } from 'src/players/schemas/player.schema';
import { Event } from './event.interface';

@Schema({ timestamps: true, collection:'categories'})
export class Category {
  @Prop({type: String, unique: true })
  category: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [
    {
      name: String,
      operation: String,
      value: Number,
    }
  ] })
  events: Array<Event>

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }])
  players: Array<Player>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export type CategoryDocument = Category & Document;