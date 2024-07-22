var express = require('express');
var router = express.Router();
var User = require('../models/users')
const {checkBody} = require('../modules/checkBody')
const uid2 = require('uid2')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res)=>{
  const firstname = req.body.firstname
  const username = req.body.username
  const password = req.body.password
  
  if (!checkBody(req.body, ['username', 'password', 'firstname']))
  {
      res.json({result : false,
          error : 'Missing or empty fields.'
      })
      return
  }
  else {User.findOne({username}).then(data=>{
      if (data){
          res.json({
              result : false,
              error : 'User already exists.'
          })
          return
      }
      else {
          const token = uid2(32)
          const hash = bcrypt.hashSync(password, 10)
          const newUser = new User({
              firstname,
              username,
              password : hash,
              token,
          })
          newUser.save().then(data => res.json({result : true, user : data}))
      }
  })}
  })

  router.post('/signin', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    
    if (!checkBody(req.body,['username', 'password'])){
        res.json({
            result : false,
            error : 'Missing or empty fields.'
        })
    }
    else {
        User.findOne({username}).then(data=>{
            if (data && bcrypt.compareSync(password, data.password)){res.json({
                result : true,
                user : data,
            })}
            else {res.json({
                result : false,
                error : 'User or password incorrect'
            })}
        })
    }
    })



module.exports = router;
