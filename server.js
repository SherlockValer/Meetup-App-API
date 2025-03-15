const {connectDB} = require('./db/db.connect')
connectDB()

//
const Event = require('./models/event.model')

//
const express = require('express')
const app = express()
app.use(express.json())

//
const cors = require('cors')
const corsOptions = {
    origin: "*",
    credentials: true,
}
app.use(cors(corsOptions))

// Create
async function createNewEvent(eventData) {
    try {
        const newEvent = new Event(eventData)
        const saveEvent = newEvent.save()
        return saveEvent
    } catch(error) {
        console.log(error)
    }
}

app.post("/events", async(req, res) => {
    try {
        const newAdded = await createNewEvent(req.body)
        res.status(201).json({message: "Event added successfully!", newEvent: newAdded})
    } catch (error) {
        res.status(500).json({error: "Error fetching meetup events. Try again !"})
    }
})

// Read
// Read All
async function readAllEvents() {
    try {
        const events = await Event.find()
        return events
    } catch(error) {
        console.log(error)
    }
}

app.get("/events", async(req, res) => {
    try {
        const events = await readAllEvents()
        if(events.length !=0) {
            res.json(events)
        } else {
            res.status(404).json({error: "Events not found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Error fetching meetup events. Try again !"})
    }
})

// Read By Title
async function readByTitle(eventTitle) {
    try {
        const events = await Event.findOne({title: eventTitle})
        return events
    } catch(error) {
        console.log(error)
    }
}

app.get("/events/:eventTitle", async(req, res) => {
    try {
        const event = await readByTitle(req.params.eventTitle)
        if(event) {
            res.json(event)
        } else {
            res.status(404).json({error: "Event not found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Error fetching meetup event. Try again !"})
    }
})


// Read by Tag
async function readByTag(eventTag) {
    try {
        const events = await Event.find({tags: eventTag})
        return events
    } catch(error) {
        console.log(error)
    }
}

app.get("/events/tags/:eventTag", async(req, res) => {
    try {
        const events = await readByTag(req.params.eventTag)
        if(events.length != 0) {
            res.json(events)
        } else {
            res.status(404).json({error: "Events not found!"})
        }
    } catch (error) {
        res.status(500).json({error: "Error fetching meetup events. Try again !"})
    }
})

// Delete

// 
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
