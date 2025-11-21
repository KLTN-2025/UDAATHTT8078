@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @OneToMany(() => UserAccount, (acc) => acc.user)
  accounts: UserAccount[];
}
