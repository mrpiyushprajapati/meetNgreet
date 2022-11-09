const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    return res.end('<h1>meetNgreet profiles</h1>');
}

//render sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: 'Sign in'
    });
}

//render sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: 'Sign up'
    });
}

//get the sign up data
module.exports.create = function(req, res){
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }

    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log('Error', err);
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                return res.redirect('/users/sign-in');
            })
        }
        else{
            console.log('error in creating user while signing up');
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { console.log("Error in Logging out user"); };
    });
    return res.redirect('/');
}