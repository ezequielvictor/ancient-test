import { BetType } from '@apps/bet/graphql/bet.graphql';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  balance: number;

  @Field(() => [BetType], { nullable: true })
  bets: BetType[];
}
