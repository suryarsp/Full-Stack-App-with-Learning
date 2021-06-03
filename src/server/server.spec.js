import { addNewTask, updatetask} from './server'

(async function testServer() { 
    await addNewTask({
        name: 'Test task from server',
        id: '1T',
    })
    
    await updatetask({
        id: '1T',
        name: 'My task Updated!!!!!'
    })

})();
