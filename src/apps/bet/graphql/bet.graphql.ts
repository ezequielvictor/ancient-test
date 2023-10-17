import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class BetType {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  userId: number;

  @Field(() => Float)
  betAmount: number;

  @Field(() => Float)
  chance: number;

  @Field(() => Float)
  payout: number;

  @Field()
  win: boolean;
}
