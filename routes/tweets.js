var express = require('express')
var router = express.Router()
const Tweet = require('../models/tweets')

router.post('/newTweet', (req, res)=>{
    const r = req.body
    const newTweet = new Tweet({
        message : r.message,
        hashtag : r.hashtag,
        username : r.username,
        firstname : r.firstname,
        createdDate : new Date(),
    })

    newTweet.save().then(data=> res.json(data))
})

router.get('/', (req, res)=>{
    Tweet.find().then(data=> res.json(data))
})


router.put('/addLiker', (req, res)=>{
        Tweet.updateOne({_id : req.body.id}, {$addToSet:{likedBy : req.body.userId}}).then(data=> res.json(data))
})

router.put('/removeLiker', (req, res)=>{
    Tweet.updateOne({_id : req.body.id}, 
        {$pull : {likedBy : req.body.userId}})
        .then(data=> res.json(data))
})

router.delete('/deleteTweet/:tweetId', (req, res)=>{
    Tweet.deleteOne({_id : req.params.tweetId})
    .then(data=> res.json(data))
})

router.post('/getByHashtag', (req, res)=>{
    Tweet.find({hashtag : req.body.hashtag})
    .then(data=> res.json(data))
})

module.exports = router