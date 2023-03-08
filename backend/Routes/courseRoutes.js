
import express from 'express'
import courseController from '../controllers/courseController.js'

const courseRoutes = express.Router()

courseRoutes.post('/createcourse', courseController)
courseRoutes.get('/courses', courseController)
courseRoutes.get('/course/:id', courseController) //assigning users to this course -- created by moderator -- not editible
courseRoutes.put('/update-createdcourse/:id', courseController) //editible course, admins can add questions and information
courseRoutes.delete('/delete-createdcourse/:id', courseController)
courseRoutes.get('/task-count', courseController) //change to get??


export default courseRoutes;