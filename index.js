import express from "express";
import cors from "cors";

import dotenv from 'dotenv';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
dotenv.config({
    path: ".env"
})

app.use("/", (req, res) => {
    res.json({ message: "Hello from Express App" })
})
app.post("/completions", async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: req.body.message + `"convert this ${req.body.codelang1} code to ${req.body.codelang2} with comments"`
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