import Queue from 'bull'
import redisConfig from '../configs/redis.config.js'
import { sendEmail } from '../services/mail.service.js'

const emailQueue = new Queue("emailQueue", {
    redis: { ...redisConfig }
})

emailQueue.process((payload, done) => {
    try {
        const { data } = payload
        payload.progress(5)
        payload.log("initializing email setup")
        sendEmail(data)
            .then(res => {
                console.log("me aaya");
                payload.log("successfully send the email")
                payload.progress(100)
                done()
            })
            .catch(err => {
                payload.log("error sending the email")
                payload.progress(100)
                done(new Error("error sending the email"));
            })
    } catch (error) {
        console.log("error ==>", error);
    }
})

export default emailQueue;