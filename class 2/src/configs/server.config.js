import 'dotenv/config'

const serverConfig = {
    PORT: process.env.SERVER_PORT_KEY,
    mongoSecretKey: process.env.MONGODB_SECRET_KEY,
    dbUrl: process.env.MONGODB_URL
}

export default serverConfig