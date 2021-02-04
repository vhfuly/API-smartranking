import { Controller, ValidationPipe, UsePipes, Post, Body, Get, Query } from '@nestjs/common';
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
  
  @Get()
  async getChallenges(
    @Query('idPlayer') _id: string
  ): Promise<Challenge[]> {
    console.log(_id)
    return _id ? await this.challengesService.getPlayerChallenges(_id) 
    : await this.challengesService.getChallenges();
  }
}
