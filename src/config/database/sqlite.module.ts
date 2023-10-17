import { BetEntity } from '@apps/bet/bet.entity';
import { UserEntity } from '@apps/user/user.entity';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [],
      useFactory: async () => ({
        dialect: 'sqlite',
        storage: './db/db',
        models: [UserEntity, BetEntity],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DBProviderModule {}
