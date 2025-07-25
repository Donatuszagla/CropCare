import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const signUp = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        // Check if a user already exists
        const existingUser = await User.findOne({ email });
        

        if(existingUser){
            const error = new Error("User already exist");
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUsers = await User.create([{name, email, password: hashedPassword}], { session })
        
        const token = jwt.sign({ userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user: newUsers[0]
        })
        await session.commitTransaction()
    } catch (error) {
        session.abortTransaction();
        session.endSession;
        next(error)

    }


}

export const signIn = async(req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(!user){
        const error = new Error("User not found");
        error.stackCode = 404;
        throw error
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        const error = new Error("Invalid password");
        error.stackCode = 401;
        throw error
    }

    const token = jwt.sign({userId: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})


    res.status(200).json({
        success: true,
        message: "User sign in successfully",
        data: {
            token,
            user,
        }
    })
}

export const signOut = async(req, res, next) => {
    
}