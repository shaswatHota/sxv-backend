const User = require("../../models/user");
const Event = require("../../models/events");

const getEvents = async (req, res, next) => {
     try {
        const events = await Event.find()
        if (!events || events.length === 0) {
            return res.status(404).json({
                message: 'No events found in the database.',
                events: [],
            })
        }

        res.status(200).json({
        message: 'Events fetched successfully!',
        events,
    })
  } catch (err) {
    console.error('Error fetching events:', err)
    res.status(500).json({
      message: 'Server Error while fetching events',
      error: err.message,
    })
  }

}
module.exports = getEvents;