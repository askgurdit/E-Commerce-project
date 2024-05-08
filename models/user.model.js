const mongoose = require("mongoose");

// Define the schema for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    }
}, {
    timestamps: true,
    versionKey: false
});

// Export the model based on the schema
module.exports = mongoose.model("User", userSchema);
