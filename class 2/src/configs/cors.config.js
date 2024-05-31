const whitelist = ["https://localhost:3001", 'http://localhost:3004', 'http://localhost:3000']

const corsConfig = {
    origin: function (origin, callback) {
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Cors error"))
        }
    }
}

// export { corsConfig }
export default corsConfig