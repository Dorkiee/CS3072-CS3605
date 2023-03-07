import mongoose from 'mongoose'

const courseModel = mongoose.Schema(
  {
    courseName: {
		type: String,
		required: true
	},
	courseOutline: {
		type: String,
		required: true,
	},
	curriculumContent: {
		type:String,
		required: true,
	},
	curriculumVids: { //REMOVE AND CREATE IT'S OWN MODEL
		type:String,
		required: false,
	},

	curriculumGame: { //REMOVE AND CREATE IT'S OWN MODEL
		type:Boolean,
		required: false,
	},

	taskStatus : {
		type: Number,
		required: false,
	},

	Tcount: {
		type: Number,
		default: 0,
		require: false,
	  }, 
/*
	CurriculumGames: {
		type:String,
		required: false,
	},
	Examinations:{
	type:String,
	required: false,
	},

	totalUsers: {
		type: Number,
		required: false,
		default: 0
	},
	createdBy: {
		type: String,
		//required: true,
		ref: 'Moderator'
	},
	active: {
		type: Boolean,
		required: false,
		default: 1
	},

	*/
  },
  {
    timestamps: true,
  }
)

const Courses = mongoose.model('course', courseModel)
export default Courses
