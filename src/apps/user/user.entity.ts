import { BetEntity } from '@apps/bet/bet.entity';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

@Table({ modelName: 'user' })
export class UserEntity extends Model<UserEntity> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  balance: number;

  @HasMany(() => BetEntity)
  bets: Array<BetEntity>;
}
