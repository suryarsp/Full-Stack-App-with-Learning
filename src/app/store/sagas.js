import { take, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import * as mutations from './mutations';


const URL = "http://localhost:7777";

export function* taskCreationSaga() {
    while (true) {
        const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = 'U1';
        const taskID = uuidv4();
        yield put(mutations.createTask(taskID, groupID, ownerID));
        const { res } = yield axios.post(URL + `/task/new`,
            {
                task: {
                    id: taskID,
                    owner: ownerID,
                    isComplete: false,
                    name: "New Task"
                }
            });
        console.log("New Task Response...", res);
    }
}

export function* taskModificationSaga() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        axios.post(URL + '/task/update',
            {
                task: {
                    id: task.taskID,
                    group: task.groupID,
                    isComplete: task.isComplete
                }
            });
    }
}

export function* userAuthenticationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const data = axios.post(url + '/authenticate', {username, password});
            if(!data) throw new Error()
        } catch (err) {
            console.log(err);
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED))
        }
    }
}
