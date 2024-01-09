import { LOG_COLORS } from '@constants/logColors';

function serverLogger(
  color: string,
  message: string,
  sender: string = 'SERVER',
) {
  console.log(
    `[${LOG_COLORS.bright}${color}${sender}${LOG_COLORS.reset}]: %s`,
    message,
  );
}

function log(message: string) {
  serverLogger(LOG_COLORS.fg.cyan, message);
}

function info(message: string) {
  serverLogger(LOG_COLORS.fg.green, message, 'INFO');
}

function warn(message: string) {
  serverLogger(LOG_COLORS.fg.yellow, message, 'WARN');
}

function error(error: string) {
  serverLogger(LOG_COLORS.fg.red, error, 'ERROR');
}

const logger = { log, info, warn, error };

export default logger;
