const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const {User} = require("./mongoCollections/user.js");

module.exports = {
    registerUser: function(newUser) {
        return new Promise((resolve, reject) => {
            if(newUser.password1 != newUser.password2) {
                reject("Passwords do not match");
            }
            else {
                User.find({email: newUser.email}).exec()
                .then((user) => {
                    var data = user.map(value => value.toObject());
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
                                    newUserData._id = mongoose.Types.ObjectId();
                                    newUserData.password = hashedPassword;

                                    var presentDate = dayjs();
                                    newUserData.dateRegistered = dayjs(presentDate).format("dddd MMMM DD YYYY hh:mm:ss A")

                                    newUserData.save((err) => {
                                        if(err) {
                                            reject(err);
                                        }
                                        else {
                                            resolve();
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            }
            
            
        })
    }
}