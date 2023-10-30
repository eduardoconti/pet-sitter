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
});
