import fs from "fs";
// import fs from "fs/promises"


// readFile - callback

fs.readFile("./test.txt", "utf8", (err, data) => {
    if(err){
        throw err
    }
    console.log(data)
})

// readFileSync - Synchronous version

const data = fs.readFileSync("./test.txt", "utf8");
console.log(data)

// readFile() - Promises .then
fs.readFile("./test.txt", "utf8")
  .then((data) => console.log(data))
  .catch((err) => console.log(err))

// readFile() - async/await

const readFile = async () => {
    try {
        const data = await fs.readFile("./test.txt", "utf8")
        console.log(data)
    } catch (error) {
        
    }
}

const writeFile = async () => {
    try {
        await fs.writeFile("./test.txt", "Now reveal in you our Christ");
        console.log("Done")
    } catch (error) {
        
    }
}

const appendFile = async () => {
    try {
        await fs.appendFile("./test.txt", "\nWhat a beautiful name it is");
        console.log("Done")
    } catch (error) {
        
    }
}

writeFile()
appendFile()
readFile()