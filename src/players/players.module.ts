import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerSchema } from './schemas/player.schema';

@Module({
  imports:[ MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema}])],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService]
})
export class PlayersModule {}
