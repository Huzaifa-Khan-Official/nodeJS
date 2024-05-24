const http = require("node:http");
const fs = require("fs");
const queryString = require('node:querystring');
const path = require("node:path");

const PORT = 3000;
const filePath = path.join(process.cwd(), "data.json");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>Home Page!</h1>");
        return;
    }

    if (req.url === "/signup") {
        res.setHeader("Content-Type", "text/html");
        res.end(`
        <form action="/submit" method="POST">
            <div>
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" />
            </div>
            <div>
                <label>Password</lable>
                <input type="password" name="password" placeholder="Password" />
            </div>
            <div>
                <label>Confirm Password</lable>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" />
            </div>
            <button type="submit">Singup</button>
        </form>
        `);
        return;
    }

    if (req.url === "/submit") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        })

        req.on("end", () => {
            const parsedData = queryString.parse(data);

            if (parsedData.password === parsedData.confirmPassword) {
                fs.readFile(filePath, (err, data) => {
                    if (err) throw err;
                    const prevData = JSON.parse(data);

                    console.log(prevData.users);
                    prevData.users.push({
                        username: parsedData.username,
                        password: parsedData.password
                    })

                    fs.writeFile(filePath, prevData, err => {
                        if (err) {
                            console.error(err);
                        } else {
                            res.write("Signup Successfully")
                            res.end();
                        }
                    });
                });

            } else {
                res.write("Passwords do not match.")
                res.end();
            }
        })
        return;
    }
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})