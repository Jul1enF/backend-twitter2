const mongoose = require('mongoose')

const tweetSchema = mongoose.Schema({
    message : String,
    hashtag : [{
        type: String
    }],
    username : String,
    firstname : String,
    createdDate : Date,
    likedBy : [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
})

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;