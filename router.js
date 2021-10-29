import express from "express";

const userRouter = express.Router();

userRouter.get("/login", (req, res) => "login");

export default userRouter;