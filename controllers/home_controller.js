const { model } = require('mongoose');
const contact = require('../models/contact');

module.exports.home = function(req, res){
    return res.render('home', {
        title: 'meetNgreet'
    });
};

module.exports.contact = async function(req,res){
    let contacts = await contact.find({});
    return res.render('contact',{
        contacts:contacts,
        title: 'meetNgreet'
    });
};

module.exports.contactsubmit = async function(req,res){
    try{
        await contact.create({
            email:req.body.email,
            name:req.body.name,
            query:req.body.query
        });
        return res.redirect('back');
    }catch(err){
        return res.redirect('back');
    }
};