const registration =  require('../../models/registration.js')

const getRegisteredEvents = async(req,res) => {
    try {
    const { userId } = req.params;
    const registrations = await registration.find({ userId }).select('eventId');

    const eventIds = registrations.map((reg) => reg.eventId.toString());

    res.status(200).json(eventIds);

  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Server error fetching registrations' });
  }
}
module.exports = getRegisteredEvents


