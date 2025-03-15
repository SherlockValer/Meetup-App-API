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
        const newAdded = await createEvent(req.body)
        res.status(201).json({message: "Event added successfully!", newEvent: newAdded})
    } catch (error) {
        res.status(500).json({error: "Error fetching meetup events. Try again !"})
    }
})

// Read
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
        if(events.lenth !=0) {
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
