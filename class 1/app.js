const http = require("node:http");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    if(req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Home Page!</h1>");
        return;
    }

    if(req.url === "/signup") {
        res.setHeader("Content-Type", "text/html");
        res.end(`
        <form action="/">
            <div>
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" />
            </div>
            <div>
                <label>Password</lable>
                <input type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit">Singup</button>
        </form>
        `);
        return;
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.` )
})