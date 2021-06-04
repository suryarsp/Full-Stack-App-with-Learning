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
        const { res } = yield axios.post(URL + 'task/new',
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
