import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './interfaces/category.schema';
import { PlayerSchema } from 'src/players/schemas/player.schema';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports:[ 
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema}]),
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema}]),
    PlayersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports:[CategoriesService],
})
export class CategoriesModule {}
