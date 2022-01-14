import expressWinston from 'express-winston';
import winston from 'winston';
import { isProd } from './env';

type LogType = 'application' | 'access';

const logstashFormat = winston.format((info: any, opts: any) => {
  const {message, level, stack, meta} = info;

  for (const prop of Object.getOwnPropertyNames(info)) {
    info[prop] = undefined;
  }

  info.application_type = 'service';
  info.log_type = opts.logType;
  info.service = 'sicuro-frontend';
  info.host = process.env.HOSTNAME;
  info.msg = message;
  info.loglevel = level.toUpperCase();
  info.stack_trace = stack;
  info['correlation-id'] = meta?.req?.headers['correlation-id'];

  if (opts.logType === 'access') {
    info.request_method = meta?.req?.method;
    info.user_agent = meta?.req?.headers['user-agent'];
    info.remote_address = meta?.req?.headers['remote-addr'];
    info.status = meta?.res?.statusCode;
    info.url = meta?.req?.originalUrl;
    info.response_time = meta?.responseTime;
  }

  return info;
});

const createFormat = (logType: LogType) =>
  !isProd ?
  winston.format.simple() :
  winston.format.combine(
    logstashFormat({logType}),
    winston.format.json(),
  );

export const logger = winston.createLogger({
  level: 'info',
  format: createFormat('application'),
  transports: [
    new winston.transports.Console(),
  ]
});

/*
export const accessLogger = expressWinston.logger({
  level: 'info',
  meta: isProd,
  format: createFormat('access'),
  transports: [
    new winston.transports.Console(),
  ]
}); */
