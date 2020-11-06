import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayersService } from './players.service';
import { Player } from './ interfaces/player.interface';
import { PlayersValidatorParametersPipes } from './pipes/players-validaitor-parameters.pipe';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly playersService: PlayersService ){}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto
    ){
      await this.playersService.createPlayer(createPlayerDto);
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() createPlayerDto: CreatePlayerDto,
    @Param('_id',PlayersValidatorParametersPipes) _id: string 
    ): Promise<void>{
      await this.playersService.updatePlayer(_id, createPlayerDto);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAllPlayers();
    
  }

  @Get(':_id')
  async getPlayerById(
    @Param('_id',PlayersValidatorParametersPipes) _id: string
  ): Promise<Player> {
      return await this.playersService.getPlayerByID(_id);
  }

  @Delete(':_id')
  async deletePlayer(
    @Param('_id',PlayersValidatorParametersPipes) _id: string
  ): Promise<void>{
    this.playersService.deletePlayerByID(_id);
  }
}
