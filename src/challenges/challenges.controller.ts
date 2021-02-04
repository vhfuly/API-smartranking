import { Controller, ValidationPipe, UsePipes, Post, Body } from '@nestjs/common';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './schemas/challenge.schema';
import { ChallengesService } from './challenges.service';

@Controller('api/v1/challenges')
export class ChallengesController {

  constructor(
    private readonly challengesService: ChallengesService 
  ){}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto
    ): Promise<Challenge>{
      return await this.challengesService.createChallenge(createChallengeDto);
  }
}
