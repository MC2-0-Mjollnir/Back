// controllers/tasksControllers.js
import { OpenAI } from 'openai';
import { config } from 'dotenv';
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
                content: `extract tasks data from ${projectDescription} the output is one array respect this form [{id:'', name:'',start:'',end:'',progress:'',dependencies: ''} ,......]`,
              },
            ],
          });

        const tasksJSON = response.choices[0].message.content;
        const tasks = JSON.parse(tasksJSON);
        res.json({ tasks });
    } catch (error) {
        next(error);
    }
}

export default generateTasks;
