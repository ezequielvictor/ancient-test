import { BetModule } from '@apps/bet/bet.module';
import { UserModule } from '@apps/user/user.module';
import { DBProviderModule } from '@config/database/sqlite.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    DBProviderModule,
    UserModule,
    BetModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}
