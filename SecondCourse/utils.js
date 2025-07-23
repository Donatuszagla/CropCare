import fs from "fs";

export function writeDataTofile(filename, Content){
 try{
       fs.writeFileSync(filename, JSON.stringify(Content), "utf8", (err) => {
        if(err){
            console.log(err)
        }
    })
 }catch(e){
    console.log(`Error: ${e}`)
 }
}