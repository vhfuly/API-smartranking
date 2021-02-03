import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ChallengeStatus } from './challenge-status.enum';
import { Player } from 'src/players/interfaces/player.interface';
import { Match } from './challenge.interface';

@Schema({ timestamps: true, collection:'challenges'})
export class Challenge {
  @Prop({ type: Date })
  dateHourChallenge: Date;

  @Prop({ type: String })
  status: ChallengeStatus;

  @Prop({ type: Date })
  dateHourSolicitation: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Player' })
  requester: Player;

  @Prop({ type: String })
  category: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }])
  players: Array<Player>;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }])
  match: Array<Match>;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

export type ChallengeDocument = Challenge & Document;
