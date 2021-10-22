require('dotenv').config();

interface IConfig {
  PORT: string,
  ENV: string,
  ACCESS_TOKEN_SECRET: string,
  MONGOURI: string
}

const config: IConfig = {
  PORT: process.env.PORT || '3000',
  ENV: process.env.ENV || 'test',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  MONGOURI: 'baduri',
};

if (config.ENV === 'test') {
  config.MONGOURI = process.env.TESTURI as string;
} else config.MONGOURI = process.env.MONGOURI as string;

export default config;
