import mongoose, { trusted } from 'mongoose'


const examModel = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        default: "test"
      },

      lastName: {
        type: String,
        default: "test",
      },
     
      score: {
        type: Number,
        required: true,
        default: 0,
      },

      examID: {
        type: String,
        required: true,
      },

      passed: {
        type: Boolean,
        required: true,
      }
     
    },
    {
      timestamps: true,
    }
  );
  
  const Exam = mongoose.model('exam', examModel);
 
  
  export default Exam;