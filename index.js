import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDb from "./ConnectDB/index.js";
import userRouter from "./Routes/routes.js";
import codeRouter from "./Routes/datarotues.js";
import generateRouter from "./Routes/generateroute.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8080
app.use(cookieParser());
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173', 'https://code-breakdown-frontend.vercel.app', 'https://codebreakdown.netlify.app'],
};
app.use(express.json());
app.use(cors(corsOptions));
dotenv.config({
    path: ".env"
})


app.use('/users', userRouter);
app.use("/completions", codeRouter);
app.use('/generator', generateRouter);

app.get("/", (req, res) => {
    res.json({ message: "Reached Here" });
})
connectDb()
    .then(() => {
        app.use((req, res) => {
            res.send("This is the Api For The Backend Of the  Code Breakdown Application")
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Mongo Db connection failed !!!", err)
    });