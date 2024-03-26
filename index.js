import express from "express";
import cors from "cors";

import dotenv from 'dotenv';
import userRouter from "./Routes/routes.js";
import connectDb from "./ConnectDB/index.js";

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
app.post("/completions", async (req, res) => {
    const options = {
        method: ["POST"],
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: req.body.message + `"convert this ${req.body.codelang1} code to ${req.body.codelang2}"`
            }],
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error)
    }

})

connectDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Mongo Db connection failed !!!", err)
    });