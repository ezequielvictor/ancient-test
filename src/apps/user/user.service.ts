import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { LOCK, Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './user.entity';
import { BetEntity } from '@apps/bet/bet.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity)
    private userRepository: typeof UserEntity,
  ) {}

  public async findOneById(id: number, transaction?: Transaction, lock?: LOCK) {
    return await this.userRepository.findOne<UserEntity>({
      where: { id },
      transaction,
      lock,
    });
  }

  public async findAll() {
    return await this.userRepository.findAll<UserEntity>({
      include: [{ model: BetEntity }],
    });
  }

  public async create(user: CreateUserDto) {
    return await this.userRepository.create<UserEntity>(user);
  }
}
