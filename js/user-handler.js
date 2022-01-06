const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require('uuid');
const { User } = require("./mongoCollections/user.js");

module.exports = {
    registerUser: function(newUser) {
        return new Promise((resolve, reject) => {
            if(newUser.password1 != newUser.password2) {
                reject("Passwords do not match");
            }
            else {
                User.find({email: newUser.email}).exec()
                .then((users) => {
                    var data = users.map(value => value.toObject())
                    if(data.length != 0) {
                        reject("Email is already in use");
                    }
                    else {
                        bcrypt.genSalt(10, (err, salt) => {
                            if(err) reject(err);
                            bcrypt.hash(newUser.password1, salt, (err, hashedPassword) => {
                                if(err) reject(err);
                                else {
                                    let newUserData = new User(newUser);
                                    newUserData._id = uuidv4();
                                    newUserData.password = hashedPassword;

                                    var presentDate = dayjs();
                                    newUserData.dateRegistered = dayjs(presentDate).format("dddd MMMM DD YYYY hh:mm:ss A")

                                    newUserData.save((err) => {
                                        if(err) reject(err);
                                        else {
                                            resolve(true)
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            }
        })
    },

    loginUser: function(user) {
        return new Promise((resolve, reject) => {
            User.find({email: user.email}).exec()
            .then((users) => {
                var data = users.map(value => value.toObject())
                if(data.length === 0) reject("Email has not been registered")
                else {
                    bcrypt.compare(user.password, data[0].password, function(err, res) {
                        if(err) reject(err);
                        else if(!res) reject("Password is incorrect")
                        else {
                            resolve(data[0]);
                        }
                    })
                }
            })
        })
    },

    getUserById: function(userId) {
        return new Promise((resolve, reject) => {
            User.find({_id: userId}).exec()
            .then((users) => {
                var data = users.map(value => value.toObject())
                if(data.length === 0) reject("No users match the provided id")
                else {
                    var user = {
                        firstName: data[0].firstName,
                        lastName: data[0].lastName
                    }
                    resolve(user);
                }
            })
        })
    }
}