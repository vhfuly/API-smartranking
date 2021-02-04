import { IsNotEmpty, IsDateString, IsArray, ArrayMaxSize, ArrayMinSize } from 'class-validator';
import { Player } from 'src/players/schemas/player.schema';

export class CreateChallengeDto{

  @IsNotEmpty()
  @IsDateString()
  dateHourChallenge: Date;

  @IsNotEmpty()
  requester: Player;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<Player>;
}