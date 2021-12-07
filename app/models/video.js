const mongoose = require('mongoose')
const reviewSchema = require('./review')

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
	review: [reviewSchema],
	//create a one-to-many relationship. where one user has many events
	// using the User reference
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

module.exports = mongoose.model('Video', videoSchema)
