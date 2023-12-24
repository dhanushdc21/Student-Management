const express = require('express')
const router = express.Router()
const student = require('../model/detail')
const detail = require('../model/detail')

router.get('/', async(req,res) => {
    try{
        // const students = await student.find()
        // res.json(students)
        const { emailID, password } = req.body;

        if(emailID==='admin@aadmin.com' && password==='admin'){
            const students = await student.find()
            res.json(students)
            res.redirect('/admin')
        }
        else{
            //res.json({ message: 'Not admin' });
            const stud = await student.findOne({ emailID });
            if (!stud) {
                res.json({ error: 'Student not found' });
            }
            if (stud.password === password) {
                res.json({ message: 'Login successful' });
                const redirect = `/:${stud.id}`;
                res.redirect(redirect);
            } else {
                res.json({ error: 'Invalid credentials' });
            }
        }
    }catch(err){
        res.send('ERROR' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
        const stud = await student.findById(req.params.id)
        res.json(stud)
    }catch(err){
        res.send('Enter valid username.')
    }
})

router.post('/admin', async(req,res) => {
    const accept = new detail({
        name:req.body.name,
        emailID:req.body.emailID,
        password:req.body.password,
        tasks:req.body.tasks
    })

    try{
        const a1= await accept.save()
        res.send(a1)
    }catch(err){
        res.send('ERROR' +err)
    }
})

router.patch('/:id', async(req,res) => {
    try{
        const stud = await detail.findById(req.params.id); // Find the index of the task you want to update
        const taskIndex = stud.tasks.findIndex(task => task._id == req.body.taskId); // Update the 'done' field for the specific task
        stud.tasks[taskIndex].done = req.body.done;// Save the updated student document
        const updatedStudent = await stud.save();
        res.json(updatedStudent);
    }catch(err){
        res.send('ERROR'+ err)
    }
})

router.delete('/admin/:id', async(req,res) => {
    try{
        const stud = await detail.findById(req.params.id);
        if (!stud) {
            res.json({ error: 'Student not found' });
        }
        const taskId = req.body.taskId;
        const taskIndex = stud.tasks.findIndex(task => task._id == taskId);
        if (taskIndex === -1) {
            res.json({ error: 'Task not found' });
        }
        stud.tasks.splice(taskIndex, 1);
        const updatedStudent = await stud.save();
        res.json(updatedStudent);
    }catch(err){
        res.send('ERROR'+ err)
    }
})

module.exports = router