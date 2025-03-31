import { Entity , PrimaryGeneratedColumn , Column } from "typeorm";

@Entity()
export class products1{
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({unique: true})
    sku!: string;

    @Column()
    name!: string;

    @Column({ type: "decimal", nullable: false, default: 0 })  
    price!: number;

    @Column('text',{array:true})
    images!: string[];
}