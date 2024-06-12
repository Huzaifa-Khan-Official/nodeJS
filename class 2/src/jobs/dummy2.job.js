import cron from "node-cron";

const dummyJob2 = cron.schedule("* * * * *", () => {
    console.log('running a task every minute');
})

export { dummyJob2 }