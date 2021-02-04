import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';

import { ChallengeDocument, Challenge } from './schemas/challenge.schema';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { PlayersService } from 'src/players/players.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ChallengeStatus } from './interfaces/challenge-status.enum';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<ChallengeDocument>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService 
  ) {}
  private readonly logger = new Logger(ChallengesService.name)

  async createChallenge(createChallengeDto : CreateChallengeDto): Promise<Challenge>{
    const { players, requester } = createChallengeDto
    for (const player of players ) {
      await this.playersService.getPlayerByID(player._id);
    };
    const requesterIsPlayer = players.filter(player => player._id === requester._id);
    if (!requesterIsPlayer?.length) {
      throw new BadRequestException('The requester must be a player of the match!');
    }
    if (players[0]._id === players[1]._id) {
      throw new BadRequestException('Players cannot be the same');
    }
    const requesterCategory = await this.categoriesService.consultPlayerCategory(requester._id);
    if (!requesterCategory){
      throw new BadRequestException('The requester must be registered in a category!');
    }
    const challengeCreate = new this.challengeModel(createChallengeDto);
    challengeCreate.category = requesterCategory.category;
    challengeCreate.dateHourSolicitation = new Date ();
    challengeCreate.status = ChallengeStatus.PENDING;
    this.logger.log(`challengeCreate: ${challengeCreate}`)
    return await challengeCreate.save()


  }
}
