import dotenv from 'dotenv'
dotenv.config({
    path: ".env"
})
export const generate = async (req, res) => {
    const options = {
        methods: ['POST'],
        headers: {
            "Authorization": 'Bearer' + process.env.OPENAI_API_KEY,
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
        const response = await fetch('https://api.openai.com/v1/chat/generator', options);
        const data = await response.json();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}