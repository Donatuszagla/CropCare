import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = http.createServer(async (req, res) => {
    try {
        if (req.method === "GET"){
            let filepath;
            if(req.url === "/"){    
                // res.writeHead(200, {"content-type": "text/html"})
                // // res.write("Hello World");
                // res.end("<h1>Home page</h1>");
                filepath = path.join(__dirname, "public", "index.html")
            }else if(req.url === "/about"){
                // res.writeHead(200, {"content-type": "text/html"})
                // // res.write("Hello World");
                // res.end("<h1>About</h1>");
                filepath = path.join(__dirname, "public", "about.html")
            }else{
                // res.writeHead(404, {"content-type": "text/html"})
                // // res.write("Hello World");
                // res.end("<h1>Not Found</h1>");
                throw new Error("Not Found")
            }

            // console.log(req.url)
            // console.log(req.method)
            const data = await fs.readFile(filepath);
            res.setHeader("Content-Type", "text/html");
            res.write(data);
            res.end();
        }else{
            throw new Error("Method not allowed")
        }
    } catch (error) {
        res.writeHead(500, {"content-type": "text/plain"})
        // res.write("Hello World");
        res.end("Server Error");
    }
    })

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})