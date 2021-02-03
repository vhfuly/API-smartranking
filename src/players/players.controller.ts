import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayersService } from './players.service';
import { Player } from './schemas/player.schema';
import { ValidatorParametersPipes } from '../common/pipes/validaitor-parameters.pipe';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly playersService: PlayersService ){}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto
    ): Promise<Player>{
      return await this.playersService.createPlayer(createPlayerDto);
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id',ValidatorParametersPipes) _id: string 
    ): Promise<void>{
      await this.playersService.updatePlayer(_id, updatePlayerDto);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAllPlayers();
    
  }

  @Get(':_id')
  async getPlayerById(
    @Param('_id',ValidatorParametersPipes) _id: string
  ): Promise<Player> {
      return await this.playersService.getPlayerByID(_id);
  }

  @Delete(':_id')
  async deletePlayer(
    @Param('_id',ValidatorParametersPipes) _id: string
  ): Promise<void>{
    this.playersService.deletePlayerByID(_id);
  }
}
