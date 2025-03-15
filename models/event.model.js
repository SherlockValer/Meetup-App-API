const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title:{type: String, required:true},
    leadImageUrl:{type:String, required:true},
    eventType:{
        type:String,
        enum:["Online", "Offline"],
        required:true,
    },
    host:{type:String, required:true},
    description:{type:String, required:true},
    sessionStartDate:{type:String, required:true},
    sessionStartTime:{type:String, required:true},
    sessionEndDate:{type:String, required:true},
    sessionEndTime:{type:String, required:true},
    dressCode:{type:String, required:true},
    ageRestrictions:{type:String, required:true},
    venue:{type:String, required:true},
    address:{type:String, required:true},
    pricing:{type:String, required:true},
    tags:{
        type:[String], 
        required:true,
    },
    speakers:{
        type:[Object],
        required:true,
    }
})

const Event = mongoose.model("Event", eventSchema)

module.exports = Event