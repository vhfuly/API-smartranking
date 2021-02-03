import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesMsodule } from './challenges/challenges.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.uwibv.mongodb.net/smartranking?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopolog:true, useFindAndModify: false }),
    PlayersModule,
    CategoriesModule,
    ChallengesMsodule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
