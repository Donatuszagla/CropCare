import { createServer } from "http";


const PORT = process.env.PORT
const users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Doe'},
    {id: 3, name: 'Liam'}
]

// Logger middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

// JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
}

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split("/")[3];

    const user = users.find(user => user.id === parseInt(id))
    if (user) {
        res.write(JSON.stringify(user));
    }else{
        res.statusCode = "404"
        res.write(JSON.stringify({message: "User Not Found"}));
    }
    res.end();
}

// Route handler for POST /api/users
const postUserByIdHandler = (req, res) => {
    let body = "";

    // listen for data
    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })
}
// Not Found Handler
const notFoundHandler = (req, res) => {
    res.statusCode = "404"
    res.write(JSON.stringify({message: "Route Not Found"}));
    res.end();
}

const server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if(req.url === "/api/users" && req.method === "GET"){
                getUsersHandler(req, res);
            }else if(req.url.match(/\/api\/users\/([0-9])/) && req.method === "GET"){
                getUserByIdHandler(req, res)
            }else if(req.url === "/api/users" && req.method === "POST"){
                postUserByIdHandler(req, res)
            }
            else{
                notFoundHandler(req, res);
            }
        })
    }
    )
})

server.listen(PORT, () => {
    console.log(`listening at port ${PORT}`)

})