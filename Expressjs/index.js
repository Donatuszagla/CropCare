const Joi = require("joi")

const express = require("express");

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

let courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
]

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/api/courses", (req, res) => {
    res.send(courses)
})

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(course => course.id.toString() === req.params.id)
    if(!course){

        res.status(404).send("No such course exist")
    }else{
        res.send(course)
    }
})

// app.get("/api/courses/:id/:name", (req, res) => {
//     res.send(req.params)
// })

app.post("/api/courses", (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    
    const results = schema.validate(req.body)


    if(results.error){
        res.status(400).send(results.error.details[0].message)
        return
    }

    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send("Name is required and must be minimum of three characters!")
    //     return
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if(!course){
        res.status(404).send("Course Not Found")
        return
    }

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const results = schema.validate(req.body)

    if(results.error){
        res.status(400).send(results.error.details[0].message)
        return
    }

    course.name = req.body.name
    res.status(200).send(course)
})

app.delete("/api/courses/:id", (req, res) =>{
    const newCourses = courses.filter(c => c.id !== parseInt(req.params.id))

    courses = newCourses
    res.send(newCourses)
})

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))