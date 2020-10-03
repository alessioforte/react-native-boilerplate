import appRoot from 'app-root-path';
import { Logger, createLogger, LoggerOptions, transports, format } from 'winston';
import chalk from 'chalk';
import { log_level, service_name } from '../config';

const colors = {
    info: "blue",
    debug: "green",
    error: "red",
    warn: "yellow"
  };

const formatting = format.combine(
    format.label({ label: `${service_name}` }),
    format.timestamp(),
    format.printf(({ level, message, label, timestamp }) => {
        const color = colors[level];
        const name = chalk.bold.inverse(label);
        const date = chalk.gray(clfdate(new Date()));
        const type = chalk.bold[color](level.toUpperCase());
        return `${date} ${name} ${type}: ${message}`;
    })
)

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: formatting
    },
    console: {
        level: log_level,
        prettyPrint: true,
        handleExceptions: true,
        json: false,
        colorize: true,
        format: formatting
    },
};

const loggerOptions: LoggerOptions = {
    transports: [
        new transports.Console(options.console),
        new transports.File(options.file)
    ],
    exitOnError: false,
}

const logger: Logger = createLogger(loggerOptions)

export const stream = {
    write: function(message: any) {
        logger.info(message);
    },
};

export default logger;

var CLF_MONTH = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  
  function pad2(num) {
    var str = String(num)
    return (str.length === 1 ? '0' : '') + str
  }
  
  function clfdate(dateTime) {
    var date = dateTime.getUTCDate()
    var hour = dateTime.getUTCHours()
    var mins = dateTime.getUTCMinutes()
    var secs = dateTime.getUTCSeconds()
    var year = dateTime.getUTCFullYear()
  
    var month = CLF_MONTH[dateTime.getUTCMonth()]
  
    return pad2(date) + ' ' + month + ' ' + year +
      ' ' + pad2(hour) + ':' + pad2(mins) + ':' + pad2(secs) +
      ' +0000'
  }
  