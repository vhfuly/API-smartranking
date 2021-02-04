import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ChallengesController } from './challenges.controller';
import { ChallengeSchema } from './schemas/challenge.schema';
import { PlayersModule } from 'src/players/players.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports:[ 
    MongooseModule.forFeature([{ name: 'Challenge', schema: ChallengeSchema }]),
    PlayersModule,
    CategoriesModule,
  ],
  providers: [ChallengesService],
  controllers: [ChallengesController]
})
export class ChallengesMsodule {}
