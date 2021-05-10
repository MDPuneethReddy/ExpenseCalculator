import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
@Entity()
export class creditCategory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column("simple-array")
    category: string[];

    @CreateDateColumn()
    date: Date;
}