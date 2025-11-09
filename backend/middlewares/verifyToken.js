const express = require("express")
const jwt = require("jsonwebtoken");
require("dotenv").config()

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: 'No authorization header provided' });
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message: "No token provided"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            return res.status(403).json({
                message: "Invalid token"
            })
        }
        req.user = decoded;
        next();
    })
}

module.exports = verifyToken