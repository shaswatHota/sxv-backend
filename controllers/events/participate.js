const Registration = require('../../models/registration.js')
const Event = require('../../models/events.js')

const participate = async (req, res) => {
  try {
    const { userId, eventId, orgId, eventName } = req.body

    if (!userId || !eventId || !orgId || !eventName) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const existingRegistration = await Registration.findOne({ userId, eventId })
    if (existingRegistration) {
      return res.status(201).json({
      message: 'Registration successful!'})
      
    }

    const newRegistration = await Registration.create({
      userId,
      eventId,
      orgId,
      eventName,
    })

    await Event.findByIdAndUpdate(eventId, {
      $addToSet: { participants: userId },
    })

    return res.status(201).json({
      message: 'Registration successful!',
      data: newRegistration,
    })
  } catch (error) {
    console.error('Registration Error:', error)
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    })
  }
}

module.exports = { participate }
