import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubcription } from "../controllers/subscription.controller.js";

const subcriptionRouter = Router()


subcriptionRouter.get("/", (req, res) => {
    res.send({title: "GET all subscriptions"})
})

subcriptionRouter.get("/:id", (req, res) => {
    res.send({title: "GET all subscription details"})
})

subcriptionRouter.post("/", authorize, createSubcription)

subcriptionRouter.put("/", (req, res) => {
    res.send({title: "UPDATE a subscription"})
})

subcriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "DELETE a subscription"})
})

subcriptionRouter.get("/user/:id", (req, res) => {
    res.send({title: "GET all user subscriptions"})
})

subcriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({title: "CANCEL subscription"})
})

subcriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming renewals"})
})

export default subcriptionRouter;