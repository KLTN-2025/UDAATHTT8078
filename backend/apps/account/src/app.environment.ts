import { CronExpression } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import * as process from 'process';
// Load env
dotenv.config({ path: process.env.ENV_PATH || '.env' });

// Environment
export const NODE_ENV: string = process.env.NODE_ENV || '';

// Server config
export const PORT: number = parseInt(process.env.PORT, 10) || 3001;
export const CONTEXT_PATH: string = process.env.CONTEXT_PATH || '';

// Database connection
export const DATABASE_HOST: string = process.env.DATABASE_HOST || '';
export const DATABASE_PORT: number =
  parseInt(process.env.DATABASE_PORT, 10) || 0;
export const DATABASE_USER: string = process.env.DATABASE_USER || '';
export const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD || '';
export const DATABASE_NAME: string = process.env.DATABASE_NAME || '';

// Redis connection
export const REDIS_HOST: string = process.env.REDIS_HOST || '';
export const REDIS_PORT: number = parseInt(process.env.REDIS_PORT, 10) || 6379;
export const REDIS_DATABASE_NUMBER: number =
  parseInt(process.env.REDIS_DATABASE_NUMBER, 10) || 0;
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD;
export const REDIS_TLS: boolean = process.env.REDIS_TLS
  ? JSON.parse(process.env.REDIS_TLS)
  : true;

// Queue Config
export const JOB_MAX_NUMBER_PROCESS = 200;
export const JOB_MAX_PROCESS_DURATION = 20000;
export const BULL_DEFAULT_ATTEMPTS_COUNT =
  parseInt(process.env.BULL_DEFAULT_ATTEMPTS_COUNT, 10) || 10;
export const BULL_DEFAULT_BACKOFF_MILLISECONDS =
  parseInt(process.env.BULL_DEFAULT_BACKOFF_MILISECONDS, 10) || 5000;
export const SYNC_TRANSACTION_JOB_ATTEMPTS =
  parseInt(process.env.SYNC_TRANSACTION_JOB_ATTEMPTS, 10) || 30;
export const SYNC_TRANSACTION_JOB_BACKOFF =
  parseInt(process.env.SYNC_TRANSACTION_JOB_BACKOFF, 10) || 10000;
export const BALANCE_UPDATE_DELAY = 500;
export const ACCOUNT_LEVEL_UPDATE_DELAY = 500;
export const DELAY_QUEUE_OPEN_CLOSE_POSITION =
  parseInt(process.env.DELAY_QUEUE_OPEN_CLOSE_POSITION) || 7_000;

// Swagger config
export const SWAGGER_ENDPOINT = process.env.SWAGGER_ENDPOINT || 'docs';

// JWT config
export const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || 'access-secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Logging config
export const LOGGING_CONSOLE_LEVEL =
  process.env.LOGGING_CONSOLE_LEVEL || 'debug';
export const LOGGING_FILE_LEVEL = process.env.LOGGING_FILE_LEVEL || 'silent';
export const LOG_FILE_PATH = process.env.LOG_FILE_PATH || './logger.log';

export const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES) || 1;

//Email config
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || '_';
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '_';
export const EMAIL_HOST = process.env.EMAIL_HOST || '_';
export const EMAIL_PORT = process.env.EMAIL_PORT || '587';

// Solana configuration
export const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || '';
export const PRIORITY_FEE_MICRO_LAMPORT = 100_000;

export const LINK_WALLET_MESSAGE =
  process.env.LINK_WALLET_MESSAGE || 'link_wallet';

// Sui configuration
export const SUI_RPC_URL = process.env.SUI_RPC_URL || '';
export const SUI_WS_RPC_URL = process.env.SUI_WS_RPC_URL || '';
export const SUI_RPC_API_KEY = process.env.SUI_RPC_API_KEY || '';
export const SUI_GRAPHQL_URL = process.env.SUI_GRAPHQL_URL || '';

// Wallet manager config
export const WALLET_MANAGER_URL = process.env.WALLET_MANAGER_URL || '';
export const WALLET_MANAGER_API_KEY = process.env.WALLET_MANAGER_API_KEY || '';

// Liquidity config
export const REQUIRED_MINIMUM_DELEGATE_ECLIPSE =
  Number(process.env.REQUIRED_MINIMUM_DELEGATE_ECLIPSE) || 0;
export const REQUIRED_GAS_FEE_ECLIPSE =
  Number(process.env.REQUIRED_GAS_FEE_ECLIPSE) || 0;
export const REQUIRED_MINIMUM_DELEGATE_SOLANA =
  Number(process.env.REQUIRED_MINIMUM_DELEGATE_SOLANA) || 0;
export const REQUIRED_GAS_FEE_SOLANA =
  Number(process.env.REQUIRED_GAS_FEE_SOLANA) || 0;
export const REQUIRED_MINIMUM_DELEGATE_SUI =
  Number(process.env.REQUIRED_MINIMUM_DELEGATE_SUI) || 0;
export const REQUIRED_GAS_FEE_SUI =
  Number(process.env.REQUIRED_GAS_FEE_SUI) || 0;
export const PERFORMANCE_FEE_PERCENT =
  Number(process.env.PERFORMANCE_FEE_PERCENT) || 0;
export const DEFAULT_SLIPPAGE = Number(process.env.DEFAULT_SLIPPAGE) || 500;

export const WITHDRAW_FEE_PERCENT =
  Number(process.env.WITHDRAW_FEE_PERCENT) || 0;
export const SYSTEM_PUBKEY = process.env.SYSTEM_PUBKEY || '';
export const SYSTEM_PUBKEY_SUI = process.env.SYSTEM_PUBKEY_SUI || '';

export const PAGE_SIZE_DEFAULT = Number(process.env.PAGE_SIZE) || 10;

export const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';

// X
export const X_CLIENT_ID = process.env.X_CLIENT_ID || '';
export const X_CLIENT_SECRET = process.env.X_CLIENT_SECRET || '';
export const X_CALLBACK_URL = process.env.X_CALLBACK_URL || '';

// Helius
export const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';
export const HELIUS_API_KEY_HEADER =
  process.env.HELIUS_API_KEY_HEADER || 'x-api-key';

export const CRON_UPDATE_ACCOUNT_LEVEL =
  process.env.CRON_UPDATE_ACCOUNT_LEVEL || CronExpression.EVERY_DAY_AT_MIDNIGHT;