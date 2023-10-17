import { Resolver, Query, Args, Int, Mutation, Float } from '@nestjs/graphql';
import { BetType } from './bet.graphql';
import { BetService } from '../bet.service';

@Resolver(() => BetType)
export class BetResolver {
  constructor(private betService: BetService) {}

  @Query(() => BetType, { name: 'getBet' })
  async getBet(@Args('id', { type: () => Int }) id: number) {
    return this.betService.findOneById(id);
  }

  @Query(() => [BetType], { name: 'getBetList' })
  async getBetList() {
    return this.betService.findAll();
  }

  @Query(() => [BetType], { name: 'getBestBetPerUser' })
  async getBestBetPerUser(@Args('limit', { type: () => Int }) limit: number) {
    return this.betService.findBestBetPerUser(limit);
  }

  @Mutation(() => BetType, { name: 'createBet' })
  async createBet(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('betAmount', { type: () => Float }) betAmount: number,
    @Args('chance', { type: () => Float }) chance: number,
  ) {
    return this.betService.create({
      userId,
      betAmount,
      chance,
    });
  }
}
