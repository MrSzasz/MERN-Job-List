const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const timeFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: timeFormat.format(new Date())
    },
    jobs: {
        type: Array,
        default: [],
    }
})

userSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

module.exports = mongoose.model('User', userSchema)