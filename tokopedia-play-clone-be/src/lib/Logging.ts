import chalk from 'chalk';
export default class Logging {
    public static info = (args: any) => {
        console.log(
            chalk.cyan(`[${new Date().toLocaleString()}] [INFO] `), 
            typeof args === 'string' ? chalk.cyanBright(args) : args
        )
    }

    public static warn = (args: any) => {
        console.log(
            chalk.yellow(`[${new Date().toLocaleString()}] [WARN] `), 
            typeof args === 'string' ? chalk.yellowBright(args) : args
        )
    }

    public static error = (args: any) => {
        console.log(
            chalk.red(`[${new Date().toLocaleString()}] [ERROR] `), 
            typeof args === 'string' ? chalk.redBright(args) : args
        )
    }
}