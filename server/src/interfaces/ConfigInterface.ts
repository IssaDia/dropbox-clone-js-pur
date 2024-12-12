export interface Config {
    use_env_variable?: string;
    database: string;
    username: string;
    password: string | null; 
    host: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    port?: number;
    logging?: boolean | ((msg: string) => void);
    [key: string]: any; 
  }
  