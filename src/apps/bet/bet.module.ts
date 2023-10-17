import { Module } from '@nestjs/common';
import { BetEntity } from './bet.entity';
import { BetService } from './bet.service';
import { BetResolver } from './graphql/bet.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '@apps/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([BetEntity]), UserModule],
  controllers: [],
  providers: [BetService, BetResolver],
  exports: [BetService],
})
export class BetModule {}
