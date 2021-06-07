import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';

import { connectDB } from './connect-db';
import * as mutations from '../app/store/mutations'

async function assmembleUserState(user) {
    let db = await connectDB();
    let tasks = await db.collection(`tasks`).find({ owner: user.id }).toArray();
    let groups = await db.collection(`groups`).find({ owner: user.id }).toArray();

    return {
        tasks,
        groups,
        session: { authenticated: mutations.AUTHENTICATED, id: user.id }
    }
}

export const authenticationRoute = app => {
    app.post('/authenticate', async (req, res) => {
        let { username, password } = req.body;
        let db = await connectDB();
        let collection = db.collection(`users`);

        let user = await collection.findOne({ name: username });

        if (!user) {
            return res.status(500).send("User not found");
        }

        let hash = md5(password);
        let passwordCorrect = hash === user.passwordHash;

        if (!passwordCorrect) {
            return res.status(500).send("Password incorrect");
        }

        let token = uuidv4();

        authenticationTokens.push({
            token,
            userID: user.id
        });
        let state = await assmembleUserState(user);
        res.send({ token, state });
    })
}