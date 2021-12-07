const mongoose = require('mongoose')
//do not have comments yet, but something I will add in the future
const commentSchema = require('./comment')

const videoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	episodeNumber: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	//do not have comments yet, but I will add these soon! Will start recording my first video this weekend! 
	comment: [commentSchema],
	//create a one-to-many relationship. where one user has many events
	// using the User reference
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

module.exports = mongoose.model('Video', videoSchema)
