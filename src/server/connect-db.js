import { MongoClient } from 'mongodb';
const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/myorganizer';
let db = null;


export async function connectDB() {
    if (db) return db;
    let client = await MongoClient.connect(URL,
        {
            useNewUrlParser: true
        });
    db = client.db();
    console.log('DB', db);
    return db;
}
