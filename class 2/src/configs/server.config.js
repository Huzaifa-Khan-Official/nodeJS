import 'dotenv/config'

const serverConfig = {
    PORT: process.env.SERVER_PORT_KEY,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    dbUrl: process.env.MONGODB_URL
}

export default serverConfig