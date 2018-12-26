var taskService = require('../service/task.service.js');

exports.addTask = async (req,res) => {
    try{
        const data = {
            name: req.body.name,
        };
        console.log("Data: ", data);
        const JOBCREATED = await taskService.addTask(data);
        res.status(200).send(JOBCREATED);
    } catch(err){
        res.status(400).send(err);
    }
}