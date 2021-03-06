import { Schema } from 'convict'

export interface ConfigSchema {
  port: number
  environment: 'development' | 'staging' | 'production' | 'test'
  awsRegion: string
  mongoUrl: string
  session: { name: string; secret: string; cookie: { maxAge: number } }
  s3: {
    s3_bucket_name: string
    s3_bucket_region: string
  }
  awsKeys: {
    aws_access_key: string
    aws_secret_key: string
  }
  mailConfig: {
    host: string
    port: number
    user: string
    password: string
    temporarySender: string
  }
  otp: {
    expiry: number
    secret: string
    numValidPastWindows: number
    numValidFutureWindows: number
  }
  health: { heapSizeThreshold: number; rssThreshold: number }
}

export const schema: Schema<ConfigSchema> = {
  port: {
    doc: 'The port that the service listens on',
    env: 'PORT',
    format: 'int',
    default: 8080,
  },
  environment: {
    doc: 'The environment that Node.js is running in',
    env: 'NODE_ENV',
    format: ['development', 'staging', 'production', 'test'],
    default: 'development',
  },
  awsRegion: {
    doc: 'The AWS region for SES. Optional, logs mail to console if absent',
    env: 'AWS_REGION',
    format: '*',
    default: 'ap-southeast-1',
  },
  awsKeys: {
    aws_access_key: {
      doc: 'Bucket name for AWS',
      env: 'AWS_ACCESS_KEY_ID',
      format: String,
      default: '',
    },
    aws_secret_key: {
      doc: 'secret key for AWS',
      env: 'AWS_SECRET_ACCESS_KEY',
      format: String,
      default: '',
    },
  },
  s3: {
    s3_bucket_name: {
      doc: 'Bucket name for S3',
      env: 'S3_BUCKET_NAME',
      format: String,
      default: '',
    },
    s3_bucket_region: {
      doc: 'Bucket name for S3',
      env: 'S3_BUCKET_REGION',
      format: String,
      default: '',
    },
  },
  mongoUrl: {
    doc: 'The connection string for mongoDB instance',
    env: 'MONGODB_URL',
    format: String,
    default: '',
  },
  mailConfig: {
    host: {
      doc: 'The SMTP host to be used',
      env: 'SES_SMTP_HOST',
      default: '',
      format: String,
    },
    port: {
      doc: 'The SMTP port to be used',
      env: 'SES_SMTP_PORT',
      default: 25,
      format: 'int',
    },
    user: {
      doc: 'The SMTP user to be used',
      env: 'SES_SMTP_USER',
      default: '',
    },
    password: {
      doc: 'The SMTP password to be used',
      env: 'SES_SMTP_PASSWORD',
      default: '',
    },
    temporarySender: {
      doc: 'Temporary sender for SES used',
      env: 'DOCULENS_EMAIL_SENDER',
      default: '',
    },
  },
  session: {
    name: {
      doc: 'Name of session ID cookie to set in response',
      env: 'SESSION_NAME',
      default: 'ts-template',
      format: String,
    },
    secret: {
      doc: 'A secret string used to generate sessions for users',
      env: 'SESSION_SECRET',
      default: 'toomanysecrets',
      format: String,
    },
    cookie: {
      maxAge: {
        doc: 'The maximum age for a cookie, expressed in ms',
        env: 'COOKIE_MAX_AGE',
        format: 'int',
        default: 24 * 60 * 60 * 1000, // 24 hours
      },
    },
  },
  otp: {
    expiry: {
      doc: 'The number of seconds that an OTP is valid for a user',
      env: 'OTP_EXPIRY',
      format: 'int',
      default: 300,
    },
    secret: {
      doc: 'A secret string used to generate TOTPs for users',
      env: 'OTP_SECRET',
      format: '*',
      default: 'toomanysecrets',
    },
    numValidPastWindows: {
      doc: 'The number of past windows for which tokens should be considered valid, where a window is the duration that an OTP is valid for, e.g. OTP expiry time.',
      env: 'OTP_NUM_VALID_PAST_WINDOWS',
      format: 'int',
      default: 1,
    },
    numValidFutureWindows: {
      doc: 'The number of future windows for which tokens should be considered valid, where a window is the duration that an OTP is valid for, e.g. OTP expiry time.',
      env: 'OTP_NUM_VALID_FUTURE_WINDOWS',
      format: 'int',
      default: 0,
    },
  },
  health: {
    heapSizeThreshold: {
      doc: 'Heap size threshold before healthcheck fails (in bytes).',
      env: 'HEAP_SIZE_THRESHOLD',
      format: 'int',
      // TODO: Set to a more reasonable value depending on the instance size used.
      default: 200 * 1024 * 1024, // 200MB
    },
    rssThreshold: {
      doc: 'Resident set size threshold before healthcheck fails (in bytes).',
      env: 'RSS_THRESHOLD',
      format: 'int',
      // TODO: Set to a more reasonable value depending on the instance size used.
      default: 3000 * 1024 * 1024, // 3000MB
    },
  },
}
