import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db'
import './initialize-db';
import { authenticationRoute } from './authenticate'
let port = process.env.PORT || 8888;
const TASKS = 'tasks';


// NOTE: express is initialized
let app = express();


// NOTE: Express is listening on given port number
app.listen(port,
    console.log("server listening on", port));



// NOTE: Denotes the plugin of the application
app.use(
    cors(),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
)

authenticationRoute(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, `../../dist`)));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('index.html'));
    })
}

// NOTE: Defining the HTTP methods

// app.get('/', (reqest, response) => {
//     response.send('Hello, world');
// })

export const addNewTask = async (task) => {
    let db = await connectDB();
    let collection = db.collection(TASKS);
    await collection.insertOne(task);
}

export const updatetask = async (task) => {
    let { id, group, isComplete, name } = task;
    let db = await connectDB();
    let collection = db.collection(TASKS);

    // NOTE: Check if the id mataches the current object in first params
    // NOTE: SET is used to update the current value
    if (group) {
        await collection.updateOne({ id }, { $set: { group } })
    }
    if (name) {
        await collection.updateOne({ id }, { $set: { name } })
    }
    if (isComplete !== undefined) {
        await collection.updateOne({ id }, { $set: { isComplete } })
    }
}

app.post('/task/new', async (req, res) => {
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
})

app.post('/task/update', async (req, res) => {
    let task = req.body.task;
    await updatetask(task);
    res.status(200).send();
})