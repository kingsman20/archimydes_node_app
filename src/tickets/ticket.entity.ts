import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

export enum Type {
  ENHANCEMENT = "Enhancement",
  BUGFIX = "BugFix",
  DEVELOPMENT = "Development",
  QA = "QA",
}

export enum Complexity {
  LOW = "Low",
  MID = "Mid",
  HIGH = "High",
}

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  summary: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    type: "enum",
    enum: Type,
  })
  type: Type;

  @Column({
    type: "enum",
    enum: Complexity,
  })
  complexity: Complexity;

  @Column({ nullable: false })
  completionTime: number;

  @Column({ nullable: false })
  cost: number;

  @Column({
      default: 'NEW'
  })
  status: string;

  @ManyToOne(() => User, (author: User) => author.tickets)
  public author: User;
}