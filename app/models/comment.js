//do not have comments yet, but it is something I am going to want to add in the future. 

const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)
// for subdocument relationship we dont need to create a model instead we will
// export the commentSchema so it can be uses by the restaurantSchema
module.exports = commentSchema
