import * as dotenv from 'dotenv';
import * as convict from 'convict';

dotenv.config();

export const env = convict({
  environment: {
    format: String,
    default: 'development',
    env: 'NODE_ENV',
    doc: 'Is Production',
  },
  jwtSecret: {
    format: String,
    env: "JWT_SECRET",
    doc: 'jwt secret'
  },
  port: {
    format: Number,
    default: 8000,
    env: 'PORT',
    doc: 'Port of server',
  },
  graphqlEndpoint: {
    format: String,
    default: 'graphql',
    env: 'GRAPHQL_ENDPOINT',
    doc: 'Endpoint of graphql',
  },
  logColor: {
    format: String,
    default: '#6d20ab',
    env: 'LOG_PRIMARY_COLOR',
    doc: 'Color of log request',
  },
  rateLimit: {
    format: Number,
    default: 1000,
    env: 'RATE_LIMIT_MAX',
    doc: 'Rate limit request / IP',
  },
  saltOrRounds: {
    format: Number,
    default: 10,
    env: 'SALT_OR_ROUNDS ',
    doc: 'Rate limit request / IP',
  },
  mongoUrl: {
    format: String,
    default: 'mongodb://localhost:27017/nestjs-example',
    env: 'MONGODB_URL',
    doc: 'Mongo Database Url',
  },
});

export default env;
