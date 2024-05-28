const http = require("node:http");
const fs = require("fs");
const queryString = require('node:querystring');
const path = require("node:path");
const bcrypt = require('bcrypt');


const PORT = 3000;
const filePath = path.join(process.cwd(), "data.json");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    if (req.url === "/" && req.method === "POST") {
        let data = '';
        req.on("data", (chunk) => {
            data += chunk;
        })

        req.on("end", () => {
            const parsedData = queryString.parse(data);

            fs.readFile(filePath, async (err, fileData) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end("Internal Server Error");
                    return;
                }

                const jsonData = JSON.parse(fileData);

                const foundUser = jsonData.users.filter((user) => user.username == parsedData.username);
                const isUser = await bcrypt.compare(parsedData.password, foundUser[0].password)

                if (isUser) {
                    res.end("<h1>Home Page!</h1>");
                    return;
                } else {
                    res.end("<h1>Invalid Credentials</h1>")
                }
            })
        })
    }

    if (req.url === "/signup") {
        res.end(`
        <form action="/submit" method="POST">
            <div>
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" />
            </div>
            <button type="submit">Signup</button>
        </form>
        `);
        return;
    }

    if (req.url === "/submit" && req.method === "POST") {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const parsedData = queryString.parse(data);

            if (parsedData.password === parsedData.confirmPassword) {
                fs.readFile(filePath, async (err, fileData) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Internal Server Error");
                        return;
                    }

                    const jsonData = JSON.parse(fileData);

                    const saltRounds = 10;
                    const plainPasswrod = parsedData.password;

                    const encryptPassword = await bcrypt.hash(plainPasswrod, saltRounds);

                    const newUser = {
                        id: jsonData.users.length + 1,
                        username: parsedData.username,
                        password: encryptPassword
                    };

                    jsonData.users.push(newUser);

                    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                        if (err) {
                            console.error(err);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end("Internal Server Error");
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end("Signup Successful");
                            return
                        }
                    });
                });

            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end("Passwords do not match.");
            }
        });
        return;
    }

    if (req.url === "/login") {
        res.end(`
        <form action="/" method="POST">
            <div>
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit">Login</button>
        </form>
        `);
        return;
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
