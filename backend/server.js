import express from "express"
import cors from 'cors'
import * as env from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

env.config()

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

console.log(`API KEY : ${process.env.OPENAI_API_KEY}`)

const openai = new OpenAIApi(config)
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello, You are using Rakk artificial intelligence server...'
  })
})

app.post('/', async (req, res ) => {
  try {
    const prompt = req.body.prompt
    const response = await openai.createCompletion ({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })

    res.status(200).send({
      ai: response.data.choices[0].text
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error || 'Something went wrong to the server...')
  }
})

app.listen(3000, () => {
  console.log('Rakk AI server started running on http://localhost:3000')
})