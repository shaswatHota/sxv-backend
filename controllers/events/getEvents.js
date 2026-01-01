const User = require("../../models/user");
const Event = require("../../models/events");

const getEvents = async (req, res, next) => {
    Event.find().sort({ day: 1, startTime: 1 }).then(async (events) => {
        res.json({ message: "Events are ready!", events });

    }).catch((err) => {
        res.json({ message: "Events fetching error" });
    })
}
module.exports = getEvents;