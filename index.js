const express = require('express');
const mongoose = require('mongoose');
const bodypas = require('body-parser');

var app = express();

app.use(bodypas.urlencoded({ extended: false }))
app.use(bodypas.json())

//connecting to db

mongoose.connect('mongodb://localhost/localtestdb');

//creating a Schem/model

const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    username: String,
    password: String
}, { versionKey: false })

let User = mongoose.model('userdetails', userSchema);

//create user
app.post('/new', (req, res) => {

    let json_res = {
        error: true,
        message: 'Invalid'
    };

    if (!req.body.hasOwnProperty('name') ||
        !req.body.hasOwnProperty('username') ||
        !req.body.hasOwnProperty('password')) {
        res.json(json_res);
        return;
    }
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    User.create({ "name": name, "username": username, "password": password }, function(error, result) {
        if (error) {
            json_res.message = 'Invalid';
            res.json(json_res);
        } else {
            json_res.error = false;
            json_res.message = "success";
            res.json(json_res);
        }
    })
});


// //Read user

app.post('/read', (req, res) => {

    let json_res = {
        error: true,
        message: 'Invalid'
    };

    if (!req.body.hasOwnProperty('name') ||
        !req.body.hasOwnProperty('username') ||
        !req.body.hasOwnProperty('password')) {
        res.json(json_res);
        return;
    }
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    User.find({ "name": name, "username": username, "password": password }, function(error, result) {
        if (error) {
            json_res.message = 'Invalid';
            res.json(json_res);
        } else {
            json_res.error = false;
            json_res.message = 'success';
            json_res.user_id = result[0]['_id'];
            res.json(json_res);
        }
    });
});

// //update

app.post('/update', (req, res) => {

    let json_res = {
        error: true,
        message: 'Unable to find the user'
    };

    if (!req.body.hasOwnProperty('name') ||
        !req.body.hasOwnProperty('username') ||
        !req.body.hasOwnProperty('password')) {
        res.json(json_res);
        return;
    }
    let name = req.body.name;
    let new_username = req.body.username;
    let new_password = req.body.password;
    User.findOneAndUpdate({ "name": name }, { $set: { "name": name, "username": new_username, "password": new_password } }, function(error, result) {
        if (error) {
            res.json(json_res);
        } else {
            json_res.error = false;
            json_res.message = 'success';
            res.json(json_res);
        }
    });
});

//delete

app.post('/remove', (req, res) => {

    let json_res = {
        error: true,
        message: 'Unable to find the user'
    };

    if (!req.body.hasOwnProperty('name') ||
        !req.body.hasOwnProperty('username') ||
        !req.body.hasOwnProperty('password')) {
        res.json(json_res);
        return;
    }
    let name = req.body.name;
    let new_username = req.body.username;
    let new_password = req.body.password;
    User.remove({ "name": name, "username": new_username, "password": new_password }, function(error, result) {
        if (error) {
            res.json(json_res);
        } else {
            //json_res.error = false;
            json_res.message = 'successfully Deleted the user';
            res.json(json_res);
        }
    });
});


app.listen(1547, () => {
    console.log('I am running on 1547')
});