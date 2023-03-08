
import express from 'express'
import userController from "../controllers/userController.js"
import curriculumController from "../controllers/curriculumController.js"

const userRoutes = express.Router() //add comment to include courseRoutes i think should work???

userRoutes.post('/sign-up', userController)
userRoutes.post('/sign-up-admin', userController)
userRoutes.post('/log-in', userController)
userRoutes.get('/log-in', userController) //change to get??
userRoutes.post('/Dashboard', userController) //change to get??
userRoutes.get('/edits/:id', userController) //change to get??
userRoutes.get('/view/:id', userController) //change to get??
userRoutes.put('/update/:id', userController)
userRoutes.delete('/deleteUser/:id', userController)
userRoutes.post('/examinationResults',userController )
userRoutes.get('/users-count', userController) //change to get??
userRoutes.get('/check-username/:username', userController)
userRoutes.put('/examination/:id', userController)

userRoutes.post('/enrolledcourse', curriculumController)
userRoutes.get('/mycourses', curriculumController)
userRoutes.get('/mycourse/:id', curriculumController) //assigning users to this course -- created by moderator -- not editible
//courseRoutes.delete('/delete-createdcourse/:id', courseController) // to remove from user's end when deleting course from admin's end??????
userRoutes.put('/course-status/:id', curriculumController) 
userRoutes.post('/completed-course-update/:id', curriculumController) 
userRoutes.get('/enroll-count', curriculumController) 

export default userRoutes;