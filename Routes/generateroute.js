import express from "express";
import { generate } from "../controller/generate.controller.js";

const generateRouter = express.Router();

generateRouter.post('/generate', generate);

export default generateRouter;