export interface Config {
    use_env_variable?: string;
    username: string;
    password: string | null | undefined;
    database: string;
    host: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
  }
  