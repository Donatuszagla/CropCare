import Subcription from "../models/subscription.model.js"

export const createSubcription = async(req, res, next) => {
    try {
       const subscription = await Subcription.create({
        ...req.body,
        user: req.user._id,
       });
       
       res.status(201).json({})
    } catch (error) {
       next(error) 
    }
}