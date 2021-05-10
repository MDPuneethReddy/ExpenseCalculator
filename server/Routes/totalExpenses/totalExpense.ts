import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
@Entity()
export class totalExpense {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;
     
    @Column()
    totalCredit: number;

    @Column()
    totalDebit: number
    
    @Column()
    totalAmount: number;

    @CreateDateColumn()
    date: Date;
}