// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Video = require('../models/video')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /videos
router.get('/videos', requireToken, (req, res, next) => {
	Video.find()
		// respond with status 200 and JSON of the videos
		.then((videos) => res.status(200).json({ videos: videos }))
		// if an error occurs, pass it to the handler
		.catch(next)
})
// INDEX
// GET /videos
// practice with out token!
// router.get('/videos', (req, res, next) => {
//   Video.find()
//   // respond with status 200 and JSON of the videos
//     .then((videos) => res.status(200).json({ videos: videos }))
//   // if an error occurs, pass it to the handler
//     .catch(next)
// })

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/videos/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Video.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "example" JSON
		.then((video) => res.status(200).json({ video: video }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /examples
router.post('/videos', requireToken, (req, res, next) => {
	// set owner of new example to be current user
	req.body.video.owner = req.user.id

	Video.create(req.body.video)
		// respond to succesful `create` with status 201 and JSON of new "example"
		.then((video) => {
			res.status(201).json({ video })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/videos/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.video.owner

	Video.findById(req.params.id)
		.then(handle404)
		// ensure the signed in user (req.user.id) is the same as the example's owner (example.owner)
		.then((video) => requireOwnership(req, video))
		// updating video object with videoData
		.then((video) => video.updateOne(req.body.video))
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/videos/:id', requireToken, (req, res, next) => {
	Video.findById(req.params.id)
		.then(handle404)
		// ensure the signed in user (req.user.id) is the same as the example's owner (example.owner)
		.then((video) => requireOwnership(req, video))
		// delete video from mongodb
		.then((video) => video.deleteOne())
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
