import { IsNotEmpty, IsDateString, IsArray, ArrayMaxSize, ArrayMinSize } from 'class-validator';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class UpdateChallengeDto{

  @IsNotEmpty()
  @IsDateString()
  dateHourChallenge: Date;

  @IsNotEmpty()
  status: ChallengeStatus;
}