import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
@Entity()
export class expenseLog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    amount: number;

    @CreateDateColumn()
    date: Date;
}