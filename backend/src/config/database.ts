import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { products1 } from '../entities/Product';
import dotevn from "dotenv"

dotevn.config();
export const AppDatasource  = new DataSource({
    type: 'postgres',
    url:process.env.DATABASE_URL,
    synchronize:true,
    logging:true,
    entities:[products1],
    
})