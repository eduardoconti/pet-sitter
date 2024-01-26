import * as Joi from 'joi';

export interface EnvironmentVariables {
  NODE_ENV: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_LOGGING: boolean;
  DATABASE_SYNCHRONIZE: boolean;
  JWT_SECRET: string;
  MAILER_HOST: string;
  MAILER_PORT: number;
  MAILER_USER: string;
  MAILER_PASS: string;
  APP_HOST: string;
}

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required().valid('development', 'production', 'test'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_LOGGING: Joi.boolean().optional().default(true),
  DATABASE_SYNCHRONIZE: Joi.boolean().optional().default(false),
  JWT_SECRET: Joi.string().required(),
  MAILER_HOST: Joi.string().required(),
  MAILER_PORT: Joi.number().required(),
  MAILER_USER: Joi.string().required(),
  MAILER_PASS: Joi.string().required(),
  APP_HOST: Joi.string().required(),
});
