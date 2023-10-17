import { UserEntity } from '@apps/user/user.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ modelName: 'bet' })
export class BetEntity extends Model<BetEntity> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  betAmount: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  chance: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  payout: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  win: boolean;
}
