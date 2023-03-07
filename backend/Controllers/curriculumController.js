
import express from 'express'
import mongoose from 'mongoose';


import curriculmModel from '../models/curriculumModel.js'


const Enroll = mongoose.model("enrolled"); 

const curriculumController = express.Router();

curriculumController.post('/enrolledcourse', async (request, response) => { //admin users are able to create their own courses
    const {courseName} = request.body;
    try {
        const savedCourse = await Enroll.findOne({courseName})
        if(savedCourse) {
            return response.json({error: "course exists"})
        }
        const asignedCourses = new curriculmModel({
            courseName:request.body.courseName,
            courseOutline:request.body.courseOutline,
            curriculumContent: request.body.curriculumContent,
            curriculumVids:request.body.curriculumVids,
            curriculumGame: request.body.curriculumGame,
            completedContent:request.body.completedContent, 
            taskStatus: request.body.taskStatus,
            userName: request.body.userName,
            completedTasks: [],
        })
        asignedCourses.save()
        .then(data =>{
            response.send('Image uploaded successfully');
        })
        .catch (error =>{
            response.json(error)
        })
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    } catch (error) {
        response.send({ status: "error" });
      }
})


curriculumController.get("/mycourses", async (request, response, next) => {
    Enroll.find({})
    .then((data) => response.json(data))
    .catch(err => response.status(404).json({error: "no courses found"}));
});

curriculumController.get("/enroll-count", async (request, response, next) => {
    Enroll.countDocuments({})
      .then(count => {
        response.json({ count });
      })
      .catch(next);
  });

curriculumController.get("/mycourse/:id", async (request, response, next) => {
    Enroll.findById(request.params.id)
    .then(user => response.json(user))
    .catch(error =>response.status(404).json({error: 'no course'}))
});


curriculumController.put("/course-status/:id", async (request, response, next) => {
    Enroll.findByIdAndUpdate(request.params.id, request.body)
        .then(user => response.json({ msg: 'completed courses added' }))
        .catch(err =>
            response.status(400).json({ error: 'Unable to update the Database' })
        );
    
});

curriculumController.post("/completed-course-update/:id", async (request, response, next) => {
    try {
        const completedTask = request.body; // Get the completed task data from the request body
        const user = await Enroll.findByIdAndUpdate(request.params.id, request.body); // Find the user by ID

        if (!user) {
            return response.status(404).send({ error: "User not found" }); // Handle if user not found
        }

        user.completedTasks.push(completedTask); // Add the completed task to the user's list
        await user.save(); // Save the updated user document

        response.send(user); // Send back the updated user document


        const userName = await Enroll.findById({completedTask})
        if(userName) {
            return response.json({error: "user had already completed course exists"})
        }

    } catch (error) {
        response.status(500).send({ error: "Server error" }); // Handle server errors
    }
});


export default curriculumController;