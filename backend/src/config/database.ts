import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { products1 } from '../entities/Product';


export const AppDatasource  = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:"postgres",
    password:'akshay108',
    database:'data',
    synchronize:true,
    logging:true,
    entities:[products1],
    
})