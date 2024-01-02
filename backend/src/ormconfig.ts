import { DataSourceOptions, DataSource } from 'typeorm';
import 'dotenv/config';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: './database.db',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  logging: false,
};

const dataSource = new DataSource(config);
export default dataSource;
