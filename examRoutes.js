
import express from 'express'
import examController from './examController.js'
import userController from './userController.js'

const examRoutes = express.Router() //add comment to include courseRoutes i think should work???


examRoutes.post('/examinationResults', examController)
examRoutes.get('/examination', examController)
examRoutes.post('/Dashboard', userController) //change to get??

export default examRoutes;