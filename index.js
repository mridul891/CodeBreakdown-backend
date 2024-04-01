import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDb from "./ConnectDB/index.js";
import userRouter from "./Routes/routes.js";
import codeRouter from "./Routes/datarotues.js";
import generateRouter from "./Routes/generateroute.js";

const app = express();
const port = 8080
const corsOptions = {
    origin: ['http://localhost:5173', 'https://code-breakdown-frontend.vercel.app'],
    // You can also use an array of allowed origins:
    // origin: ['http://domain1.com', 'http://domain2.com']
};
app.use(express.json());
app.use(cors(corsOptions));
dotenv.config({
    path: ".env"
})


app.use('/users', userRouter);
app.use("/completions", codeRouter);
app.use('/generator', generateRouter);

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