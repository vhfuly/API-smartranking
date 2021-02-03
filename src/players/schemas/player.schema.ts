import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';;

@Schema({ timestamps: true, collection:'players'})
export class Player {
  @Prop({ type: String, unique: true})
  email: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  ranking: string;

  @Prop({ type: Number })
  possitionRanking: number;

  @Prop([{ type: String }])
  URLPhotoPlayer: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

export type PlayerDocument = Player & Document;

// import { Document } from 'mongoose';

// export interface Player extends Document{
//   readonly _id: string;
//   readonly phoneNumber: string;
//   readonly email: string;
//   name: string;
//   ranking: string;
//   possitionRanking: number;
//   URLPhotoPlayer: string;
// }