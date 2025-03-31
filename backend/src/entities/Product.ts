import { Entity , PrimaryGeneratedColumn , Column } from "typeorm";

@Entity()
export class products1{
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({unique: true})
    sku!: string;

    @Column()
    name!: string;

    @Column("decimal")
    price!:number;

    @Column('text',{array:true})
    images!: string[];
}