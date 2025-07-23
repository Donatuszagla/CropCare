import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import authRouter from "./Routes/auth.routes.js";
import userRouter from "./Routes/user.routes.js";
import subcriptionRouter from "./Routes/susbscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subcriptionRouter);
app.use(errorMiddleware);
app.use(arcjetMiddleware)


app.get("/", (req, res) => {
    res.send("Welcome to Subscription tracker API")
})


app.listen(PORT, async(req, res) => {
    console.log(`Server running at port ${PORT}`);

    await connectToDatabase();
})

export default app;