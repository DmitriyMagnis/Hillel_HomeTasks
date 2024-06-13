import chalk from 'chalk';
import type { NextFunction, Request, Response } from 'express';

export class MyLogger {
  static warn(...strs: string[]) {
    console.log(chalk.yellow(...strs));
  }
  static info(...strs: string[]) {
    console.log(chalk.blueBright(...strs));
  }
  static error(...strs: string[]) {
    console.log(chalk.redBright(...strs));
  }
  static dir(data: any) {
    console.dir(data);
  }
}

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.DEBBUG_MODE === 'debug') {
    MyLogger.warn(
      `${req.method} | ${req.url} | ${new Date().toLocaleString()}`
    );
    next();
  } else next();
};
