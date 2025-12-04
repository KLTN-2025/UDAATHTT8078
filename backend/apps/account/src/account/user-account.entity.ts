import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

export type UserAccountType = 'wallet' | 'email';

@Entity('user_accounts')
export class UserAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar' })
  type: UserAccountType;

  @Column({ type: 'varchar' })
  provider: string;

  @Column({ unique: true })
  value: string;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;
}
