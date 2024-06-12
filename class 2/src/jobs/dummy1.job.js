import cron from "node-cron";

const dummyJob1 = cron.schedule("* * * * *", () => {
    console.log('running a task every minute');
})

export { dummyJob1 }