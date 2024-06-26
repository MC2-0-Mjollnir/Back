import { OpenAI } from 'openai';
import { config } from 'dotenv';
import parseDataString from '../utils/ParseData.js';
config()
// Set your OpenAI API key

const openAIClient = new OpenAI({
    apiKey: process.env["API_KEY"],
  });

async function generateTasks(req, res, next) {
    const projectDescription = req.body.description;

    try {
        const response = await openAIClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `extract tasks data from ${projectDescription} the output is one array respect this form [{id:'', name:'',start:'',end:'',progress:'',dependencies: ''}, ......]`,
              },
            ],
          });
          res.json({ tasks: parseDataString(response.choices[0].message.content) });
    } catch (error) {
        next(error);
    }
}

export default generateTasks;
