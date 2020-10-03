import "dotenv/config";

const port: string | number = process.env.PORT || 3030
const log_level: string = process.env.LOG_LEVEL || 'debug'
const base_url: string = process.env.BASE_URL || '/api'
const service_name: string = process.env.SERVICE_NAME || 'API'
const dbHost: string = process.env.DB_HOST || 'localhost'
const dbPort: string | number = process.env.DB_PORT || 5432
const dbDatabase: string = process.env.DB_DATABASE || 'foodbario'
const dbUser: string = process.env.DB_USER || 'admin'
const dbPassword: string = process.env.DB_PASSWORD || 'passwd'
const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || 'access_secret'
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret'

export {
  port,
  log_level,
  base_url,
  service_name,
  dbHost,
  dbPort,
  dbDatabase,
  dbUser,
  dbPassword,
  accessTokenSecret,
  refreshTokenSecret
}
