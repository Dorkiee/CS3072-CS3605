import express from 'express'
import mongoose from 'mongoose';


import userModel from '../Models/userModel.js'
import bcrypt from'bcrypt'
import jwt from 'jsonwebtoken'


const User = mongoose.model("users");


const userController = express.Router();

const JWT_SECRET = "jsid7GAds09ds()oufnhjnujsgbwsa0-0SFSDFQJK9fyuoijs£!sgh3565fg"

userController.post('/sign-up', async (request, response) => {

    const saltpassword = await bcrypt.genSalt(10)
    const securepassword = await bcrypt.hash(request.body.password, saltpassword)
    const {username} = request.body;

    try {
        const oldUser = await User.findOne({ username });
    
        if (oldUser) {
          return response.json({ error: "User Exists" });
        }

        const signedUpUser = new userModel({
            username:request.body.username,
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            companyName:request.body.companyName,
            age: request.body.age,
            role:'user',
            department:request.body.department,
            isAdmin: false,
            isUser: true,
            selectedAnswers: [],
            score:request.body.score,
            canTakeExam: request.body.canTakeExam,
            examID: request.body.examID,
            passed: request.body.passed,
            takenExam: request.body.takenExam,
            password:securepassword
        })
        signedUpUser.save()
        .then(data =>{
            response.json(data)
        })
        .catch (error =>{
            response.json(error)
        })

    } catch (error) {
        response.send({ status: "error" });
      }
})

userController.post('/sign-up-admin', async (request, response) => {

    const saltpassword = await bcrypt.genSalt(10)
    const securepassword = await bcrypt.hash(request.body.password, saltpassword)
    const {username} = request.body;

    try {
        const oldUser = await User.findOne({ username });
    
        if (oldUser) {
          return response.json({ error: "User Exists" });
        }

        const signedUpUser = new userModel({
            username:request.body.username,
            firstName:request.body.firstName,
            lastName:request.body.lastName,
            companyName:request.body.companyName,
            age: request.body.age,
            role:'admin',
            department:request.body.department,
            isAdmin: true,
            isUser: false,
            password:securepassword
        })
        signedUpUser.save()
        .then(data =>{
            response.json(data)
        })
        .catch (error =>{
            response.json(error)
        })

    } catch (error) {
        response.send({ status: "error" });
      }
})



userController.post('/log-in', async (request, response) => {

    const {username, password} = request.body;
    const user = await User.findOne({ username });

    if (!user) {
        return response.json({ error: "User Not Found" });
    }

    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({username: user.username}, process.env.JWT_SECRET);

        if(response.status(201)) {
            return response.json({status:"ok", data: token});
        } else {
            return response.json({error: "error"}) 
        }
    }

    response.json({status:"error", error: "Invaild password"})
})


userController.get("/log-in", async (request, response, next) => {
    User.find({})
    .then((data) => response.json(data))
    .catch(next);
});

userController.post("/Dashboard", async (request, response) => {
    const {token} = request.body;
    try {
        const user = jwt.verify (token, JWT_SECRET);
        const usermail = user.username;
        User.findOne({username: usermail})
        .then((data) => {
            response.send({status: "ok", data: data});
        })
        .catch((error) => {
            response.send({status: "error", data: error});
        });
    } catch (error) {

    }
});

userController.get("/log-in", async (request, response, next) => {
    User.find({})
    .then((data) => response.json(data))
    .catch(next);
});

userController.get('/check-username/:username', async (req, res, next) => {
    const username = req.params.username;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        // Username is available
        res.json({ isAvailable: true });
      } else {
        // Username is taken
        res.json({ isAvailable: false });
      }
    } catch (error) {
      next(error);
    }
  });
  

userController.get("/users-count", async (request, response, next) => {
    User.countDocuments({})
      .then(count => {
        response.json({ count });
      })
      .catch(next);
  });

userController.get("/edits/:id", async (request, response, next) => {
    User.findById(request.params.id)
    .then(user => response.json(user))
    .catch(error =>response.status(404).json({error: 'no empolyee'}))
});

userController.get("/view/:id", async (request, response, next) => {
    User.findById(request.params.id)
    .then(user => response.json(user))
    .catch(error =>response.status(404).json({error: 'no task completed'}))
});

userController.put("/update/:id", async (request, response, next) => {
        User.findByIdAndUpdate(request.params.id, request.body)
        .then(user => response.json({ msg: 'Updated successfully' }))
        .catch(err =>
            response.status(400).json({ error: 'Unable to update the Database' })
        );
    
});

userController.delete("/deleteUser/:id", async (request, response, next) => {
    User.findByIdAndRemove(request.params.id, request.body)
    .then(user => response.json({ msg: 'User deleted successfully' }))
    .catch(err =>
        response.status(404).json({ error: 'Unable to delete user from the Database' })
    );

});


userController.put("/examination/:id", async (request, response, next) => {
    try {
        const answer = request.body; // Get the completed task data from the request body
        const user = await User.findByIdAndUpdate(request.params.id, request.body); // Find the user by ID

        if (!user) {
            return response.status(404).send({ error: "User not found" }); // Handle if user not found
        }

        user.answers.push(answer); // Add the completed task to the user's list
        await user.save(); // Save the updated user document

        response.send(user); // Send back the updated user document


        const userName = await User.findById({answer})
        if(userName) {
            return response.json({error: "user had already completed exam"})
        }

    } catch (error) {
        response.status(500).send({ error: "Server error" }); // Handle server errors
    }
});

export default userController;