import express from 'express'
import mongoose from 'mongoose';
import courseModel from '../models/courseModel.js'


const Courses = mongoose.model("course");

const courseController = express.Router();




courseController.post('/createcourse', async (request, response) => { //admin users are able to create their own courses
    const { courseName, curriculumContent } = request.body;
    if (!courseName || !curriculumContent) {
      return response.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const createdCourse = await Courses.findOne({courseName})
        if(createdCourse) {
            return response.json({error: "course exists"})
        }
        const newCourses = new courseModel({
            courseName:request.body.courseName,
            courseOutline:request.body.courseOutline,
            curriculumContent: request.body.curriculumContent,
            curriculumVids:request.body.curriculumVids,
            curriculumGame: request.body.curriculumGame,
            image: request.body.image,
           // CurriculumGames:request.body.CurriculumGames,
           // totalUsers:request.body.totalUsers,
           // createdBy:request.body.createdBy,
            //active: true,
        })
        newCourses.save()
        .then(data =>{
            response.json(data)
            response.send('File uploaded successfully');
            console.log(request.file);
        })
        .catch (error =>{
            response.json(error)
        })
        
    } catch (error) {
        response.send({ status: "error" });
      }
})


courseController.get("/courses", async (request, response, next) => {
    Courses.find({})
    .then((data) => response.json(data))
    .catch(err => response.status(404).json({error: "no courses found"}));
});

courseController.get("/task-count", async (request, response, next) => {
    Courses.countDocuments({})
      .then(count => {
        response.json({ count });
      })
      .catch(next);
  });

courseController.get("/course/:id", async (request, response, next) => {
    Courses.findById(request.params.id)
    .then(user => response.json(user))
    .catch(error =>response.status(404).json({error: 'no course'}))
});

courseController.put("/update-createdcourse/:id", async (request, response, next) => {
    Courses.findByIdAndUpdate(request.params.id, request.body)
        .then(user => response.json({ msg: 'Updated successfully' }))
        .catch(err =>
            response.status(400).json({ error: 'Unable to update the Database' })
        );
    
});

courseController.delete("/delete-createdcourse/:id", async (request, response, next) => {
    Courses.findByIdAndRemove(request.params.id, request.body)
    .then(user => response.json({ msg: 'User deleted successfully' }))
    .catch(err =>
        response.status(404).json({ error: 'Unable to delete user from the Database' })
    );

});



export default courseController;