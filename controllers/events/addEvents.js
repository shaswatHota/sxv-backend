const Event = require('../../models/events')

exports.addEvent = async (req, res) => {
  try {
    const data = req.body

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return res.status(400).json({ message: 'Event array cannot be empty.' })
      }

      const savedEvents = await Event.insertMany(data)

      return res.status(201).json({
        message: `${savedEvents.length} events created successfully!`,
        events: savedEvents,
      })
    }

    const {
      orgId,
      email,
      day,
      eventName,
      eventDescription,
      posterUrl,
      venue,
      organiser,
      startTime,
      endTime,
      registrationLink,
      firstPrize,
      secondPrize,
      thirdPrize,
      eventType,
    } = data

    if (!orgId || !eventName || !day || !venue || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields.' })
    }
    const newEvent = new Event({
      orgId,
      email,
      day,
      eventName,
      eventDescription,
      posterUrl,
      venue,
      organiser,
      startTime,
      endTime,
      registrationLink,
      firstPrize,
      secondPrize,
      thirdPrize,
      eventType,
      participants: [],
    })

    const savedEvent = await newEvent.save()

    res.status(201).json({
      message: 'Event created successfully!',
      event: savedEvent,
    })
  } catch (err) {
    console.error('Error adding event:', err)
    
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Validation Error', error: err.message })
    }
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}
