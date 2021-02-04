import { Controller, ValidationPipe, UsePipes, Post, Body, Get, Query, Param, Delete, Put } from '@nestjs/common';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { Challenge } from './schemas/challenge.schema';
import { ChallengesService } from './challenges.service';
import { ChallengeStatusValidacaoPipe } from './pipes/challenge-status-validation.pipe';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';

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
    @Query('idPlayer') _id: string,
  ): Promise<Challenge[]> {
    console.log(_id)
    return _id ? await this.challengesService.getPlayerChallenges(_id) 
    : await this.challengesService.getChallenges();
  }

  @Put('/:Challenge')
  async updateChallenge(
    @Body(ChallengeStatusValidacaoPipe) updateChallengeDto: UpdateChallengeDto,
    @Param('Challenge') _id: string
  ): Promise<void> {
    await this.challengesService.updateChallenge(_id, updateChallengeDto)
  }

  @Delete('/:_id')
  async deleteChallenge(
    @Param('_id') _id: string,
  ): Promise<void> {
    await this.challengesService.deleteChallenge(_id)
  }

}
