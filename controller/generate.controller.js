import dotenv from 'dotenv'
dotenv.config({
    path: ".env"
})
export const generate = async (req, res) => {
    const api_key = process.env.OPENAI_API_KEY
    const options = {
        method: ['POST'],
        headers: {
            "Authorization": `Bearer ${api_key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: "user",
                content: req.body.message,
            }],
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}