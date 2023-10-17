import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { UserType } from './user.graphql';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType, { name: 'getUser' })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @Query(() => [UserType], { name: 'getUserList' })
  async getUserList() {
    return this.userService.findAll();
  }

  @Mutation(() => UserType, { name: 'createUser' })
  async createUser(
    @Args('name') name: string,
    @Args('balance') balance: number,
  ) {
    return this.userService.create({ name, balance });
  }
}
