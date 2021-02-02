import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {

  constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

  async createPlayer(createPlayerDto : CreatePlayerDto): Promise<Player>{

    const { email } = createPlayerDto;

    const playersFound = await this.playerModel.findOne({ email }).exec();

    if(playersFound){
      throw new BadRequestException(`Player with registered email: ${email}`)
    } 
    const playerCreate = new this.playerModel(createPlayerDto);
    return await playerCreate.save()
  }

  async updatePlayer(_id: string, updatePlayerDto : UpdatePlayerDto): Promise<void>{
    const playersFound = await this.playerModel.findOne({ _id }).exec();

    if(!playersFound){
      throw new NotFoundException(`Player with id: ${_id} not found.`)
    }

    await this.playerModel.findByIdAndUpdate(
      {_id},
      {$set: updatePlayerDto}
    );
  }

  async getAllPlayers(): Promise<Player[]>{
    return await this.playerModel.find().exec();
  }

  async getPlayerByID(_id : string): Promise<Player>{
    const playersFound = await this.playerModel.findOne({ _id });
    if(!playersFound){
      throw new NotFoundException(`Id-${_id} not found`)
    }
    return playersFound
  }

  async deletePlayerByID(_id : string): Promise<any>{
    const playersFound = await this.playerModel.findOne({ _id }).exec();
    if(!playersFound){
      throw new NotFoundException(`Id-${_id} not found`)
    }
    return await this.playerModel.deleteOne({_id}).exec()
  }
}
