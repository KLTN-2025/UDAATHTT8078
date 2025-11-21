@Entity('user_accounts')
export class UserAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  type: 'wallet' | 'email';

  @Column()
  provider: string;

  @Column({ unique: true })
  value: string;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;
}
