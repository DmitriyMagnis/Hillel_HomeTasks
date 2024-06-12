import chalk from 'chalk';
import type { NextFunction, Request, Response } from 'express';

export class MyLogger {
  static warn(str: string) {
    console.log(chalk.yellow(str));
  }
  static info(str: string) {
    console.log(chalk.blueBright(str));
  }
  static error(str: string) {
    console.log(chalk.redBright(str));
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
