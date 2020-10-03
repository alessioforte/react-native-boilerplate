import logger from '../logger';
import { log_level as level } from '../config';

export const httpLogger = (req, res, next) => {
  res.on('finish', () => {
    const method = req.method
    const path = req.originalUrl
    const userAgent = req.headers['user-agent']
    const headers = `headers: ${JSON.stringify(req.headers, null, 2)}`;
    const body = req.body ? ` - body: ${JSON.stringify(req.body, null, 2)}` : ''
    const status = res.statusCode
    logger.info(`${method} ${path} ${status} ${userAgent}`)
    if (level === 'debug') {
      logger.debug(`${headers} ${body}`)
    }
  })
  next()
}