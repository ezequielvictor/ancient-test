import { Injectable } from '@nestjs/common';
import { CreateBetDto } from './dtos/create-bet.dto';
import { BetEntity } from './bet.entity';
import { UserService } from '@apps/user/user.service';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { UserEntity } from '@apps/user/user.entity';

@Injectable()
export class BetService {
  constructor(
    @InjectModel(BetEntity)
    private betRepository: typeof BetEntity,
    private userService: UserService,
    private sequelize: Sequelize,
  ) {}

  public async findOneById(id: number) {
    return await this.betRepository.findOne<BetEntity>({
      where: { id },
    });
  }

  public async findAll() {
    return await this.betRepository.findAll<BetEntity>();
  }

  public async create({ userId, betAmount, chance }: CreateBetDto) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.sequelize.transaction(
        { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
        async (transaction) => {
          const user = await this.userService.findOneById(
            userId,
            transaction,
            transaction.LOCK.UPDATE,
          );

          if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
          }

          user.decrement({ balance: betAmount }, { transaction });
          await user.save();

          const win = Math.random() < chance;
          const payout = win ? betAmount * (1 / chance) : 0;

          const bet = await this.betRepository.create<BetEntity>(
            { userId: user.id, betAmount, chance, payout, win },
            { transaction },
          );

          if (payout > 0) {
            user.increment({ balance: payout }, { transaction });
            await user.save();
          }

          return bet;
        },
      );
    } catch (e) {
      throw e;
    }
  }

  public async findBestBetPerUser(limit: number) {
    // eslint-disable-next-line no-useless-catch
    try {
      const bestBets = await this.betRepository.findAll({
        attributes: ['id', 'userId', 'betAmount', 'chance', 'payout', 'win'],
        where: Sequelize.literal(
          `"Bet"."id" = (SELECT "id" FROM "Bets" AS "bestBet" WHERE "bestBet"."userId" = "Bet"."userId" ORDER BY "bestBet"."payout" DESC LIMIT 1)`,
        ),
        limit: limit || 10,
        include: [
          {
            model: UserEntity,
            attributes: ['id', 'name', 'balance'],
          },
        ],
      });

      return bestBets;
    } catch (error) {
      throw error;
    }
  }
}
