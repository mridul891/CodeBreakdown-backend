import express from "express";
import { convert } from "../controller/code.controller.js";

const codeRouter = express.Router();

codeRouter.post('/convert', convert);

export default codeRouter;
