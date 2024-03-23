import express from "express";
import cors from "cors";

import dotenv from 'dotenv';

const app = express();
const port = 8080;
const corsOptions = {
    origin: ['http://localhost:5173', "http://localhost:8080/"],
    // You can also use an array of allowed origins:
    // origin: ['http://domain1.com', 'http://domain2.com']
};
app.use(express.json());
app.use(cors(corsOptions));
dotenv.config({
    path: ".env"
})

app.get("/", (req, res) => {
    res.send("hello world");
})

app.post("/completions", async (req, res) => {
    const options = {
        method: ["POST", 'GET'],
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

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
})